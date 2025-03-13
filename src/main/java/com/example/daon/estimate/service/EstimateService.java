package com.example.daon.estimate.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.admin.repository.UserRepository;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.company.repository.CompanyRepository;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.estimate.dto.request.EstimateRequest;
import com.example.daon.estimate.dto.response.EstimateResponse;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.model.EstimateItem;
import com.example.daon.estimate.repository.EstimateItemRepository;
import com.example.daon.estimate.repository.EstimateRepository;
import com.example.daon.global.service.GlobalService;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EstimateService {

    private final EstimateRepository estimateRepository;
    private final EstimateItemRepository estimateItemRepository;
    private final CustomerRepository customerRepository;
    private final StockRepository stockRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final GlobalService globalService;

    //견적서 조회
    public List<EstimateResponse> getEstimates(LocalDate searchSDate, LocalDate searchEDate, String customerName, String itemName) {
        List<EstimateEntity> estimateEntities;
        // 견적서 조회 조건: 전표로 전환되지 않은 견적서
        if (searchSDate == null && searchEDate == null && customerName == null && itemName == null) {
            estimateEntities = estimateRepository.findByReceipted(false).orElse(null);
        }

        // 동적 검색 조건 적용
        estimateEntities = estimateRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 기간 조건
            if (searchSDate != null && searchEDate != null) {
                predicates.add(criteriaBuilder.between(
                        root.get("timeStamp"),
                        searchSDate.atStartOfDay(),
                        searchEDate.atTime(23, 59, 59)
                ));
            }

            // 거래처 조건
            if (customerName != null) {
                customerRepository.findByCustomerName(customerName)
                        .ifPresentOrElse(
                                customer -> predicates.add(criteriaBuilder.equal(root.get("customerId"), customer.getCustomerId())),
                                () -> {
                                    throw new EntityNotFoundException("Customer not found: " + customerName);
                                }
                        );
            }

            // 품목 조건
            if (itemName != null) {
                // 서브 테이블인 estimateItem 과 조인
                Join<Object, Object> estimateItemJoin = root.join("items", JoinType.INNER);
                // estimateItem 테이블에서 itemName 이 일치하는지 확인
                predicates.add(criteriaBuilder.equal(estimateItemJoin.get("itemName"), itemName));
            }


            // 동적 조건 조합
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return estimateEntities
                .stream()
                .map(globalService::convertToEstimateResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateTest(EstimateRequest request) {
        // 1. 기존 EstimateEntity 가져오기
        EstimateEntity estimate = estimateRepository.findById(request.getEstimateId())
                .orElseThrow(() -> new EntityNotFoundException("Estimate not found with id: " + request.getEstimateId()));

        // 2. 관련 엔티티 가져오기
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElse(null);
        CompanyEntity company = companyRepository.findById(request.getCompanyId()).orElse(null);
        UserEntity user = userRepository.findById(request.getUserId()).orElse(null);


        // 3. 새로운 아이템 리스트 변환
        List<EstimateItem> newItems = request.getItems().stream()
                .map(itemRequest -> {
                    StockEntity stock = null;
                    if (itemRequest.getStockId() != null) {
                        stock = stockRepository.findById(itemRequest.getStockId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 stockId로 Stock을 찾을 수 없습니다."));
                    }
                    return itemRequest.toEntity(estimate, stock);
                })
                .collect(Collectors.toList());

        // 4. 기존 아이템과 새로운 아이템 비교 및 처리
        syncItems(estimate, newItems);

        // 5. 필드 업데이트
        estimate.updateFields(customer, company, user, newItems);

        // 6. 저장
        estimateRepository.save(estimate);
    }

    // 기존 아이템과 새로운 아이템을 동기화
    private void syncItems(EstimateEntity estimate, List<EstimateItem> newItems) {
        List<EstimateItem> existingItems = estimate.getItems();

        // 1. 삭제할 아이템 찾기
        List<EstimateItem> itemsToDelete = existingItems.stream()
                .filter(existingItem -> newItems.stream()
                        .noneMatch(newItem -> newItem.getItemId() != null
                                && newItem.getItemId().equals(existingItem.getItemId())))
                .toList();

        // 2. 삭제 처리
        itemsToDelete.forEach(item -> {
            estimate.getItems().remove(item); // 관계에서 제거
            estimateItemRepository.delete(item); // DB 에서 삭제
        });

        // 3. 추가 또는 업데이트 처리
        for (EstimateItem newItem : newItems) {
            Optional<EstimateItem> existingItemOptional = existingItems.stream()
                    .filter(existingItem -> existingItem.getItemId() != null
                            && existingItem.getItemId().equals(newItem.getItemId()))
                    .findFirst();

            if (existingItemOptional.isPresent()) {
                // 기존 아이템 업데이트
                EstimateItem existingItem = existingItemOptional.get();
                existingItem.updateFields(newItem); // 필드 업데이트
            } else {
                // 새로운 아이템 추가
                estimate.getItems().add(newItem);
            }
        }
    }


    //전표전환
    public void estimatesPaid(EstimateRequest request) {
        //전달받은 아이디의 엔티티 isReceipted 를 true / false 로 변경
        EstimateEntity estimate = estimateRepository.findById(request.getEstimateId()).orElseThrow(() -> new IllegalArgumentException("잘못된 아이디입니다."));
        //원래의 반대로 저장
        estimate.setReceipted(!estimate.isReceipted());
        estimateRepository.save(estimate);
    }

    @Transactional
    public void saveEstimate(EstimateRequest request) {
        System.out.println(request.toString());
        // 1. 필요한 엔티티 조회
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElse(null);
        CompanyEntity company = companyRepository.findById(request.getCompanyId()).orElse(null);
        UserEntity user = userRepository.findById(request.getUserId()).orElse(null);

        // 2. EstimateEntity 생성
        EstimateEntity estimate = request.toEntity(customer, company, user, null);

        // 3. 아이템 리스트 변환
        List<EstimateItem> newItems = request.getItems().stream()
                .map(itemRequest -> {
                    StockEntity stock = null;
                    if (itemRequest.getStockId() != null) {
                        stock = stockRepository.findById(itemRequest.getStockId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 stockId로 Stock을 찾을 수 없습니다."));
                    }
                    return itemRequest.toEntity(estimate, stock);
                })
                .collect(Collectors.toList());

        // 4. 연관관계 세팅(양방향인 경우):
        // 만약 편의 메서드를 사용하지 않고 직접 리스트에 추가할 경우:
        estimate.setItems(new ArrayList<>());  // 혹은 request.toEntity(...) 내부에서 초기화
        for (EstimateItem item : newItems) {
            item.setEstimate(estimate);
            estimate.getItems().add(item);
        }
        // 5. EstimateEntity 저장 (cascade = ALL이므로 item들도 자동으로 저장됨)
        estimateRepository.save(estimate);
    }
}
