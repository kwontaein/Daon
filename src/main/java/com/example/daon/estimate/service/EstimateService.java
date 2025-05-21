package com.example.daon.estimate.service;

import com.example.daon.admin.model.UserEntity;
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
import com.example.daon.receipts.model.FromCategory;
import com.example.daon.receipts.model.ReceiptCategory;
import com.example.daon.receipts.model.ReceiptEntity;
import com.example.daon.receipts.repository.ReceiptRepository;
import com.example.daon.stock.model.StockEntity;
import com.example.daon.stock.repository.StockRepository;
import com.example.daon.task.model.TaskEntity;
import com.example.daon.task.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EstimateService {

    private final EstimateRepository estimateRepository;
    private final EstimateItemRepository estimateItemRepository;
    private final CustomerRepository customerRepository;
    private final StockRepository stockRepository;
    private final TaskRepository taskRepository;
    private final CompanyRepository companyRepository;
    private final ReceiptRepository receiptRepository;


    private final GlobalService globalService;

    //견적서 조회
    public List<EstimateResponse> getEstimates(EstimateRequest estimateRequest) {
        List<EstimateEntity> estimateEntities = estimateRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 기간 조건
            if (estimateRequest.getSearchSDate() != null && estimateRequest.getSearchEDate() != null) {
                predicates.add(criteriaBuilder.between(
                        root.get("estimateDate"),
                        estimateRequest.getSearchSDate().atStartOfDay(),
                        estimateRequest.getSearchEDate().atTime(23, 59, 59)
                ));
            }

            // 거래처 조건
            if (estimateRequest.getCustomerName() != null) {
                customerRepository.findByCustomerName(estimateRequest.getCustomerName())
                        .ifPresentOrElse(
                                customer -> predicates.add(criteriaBuilder.equal(root.get("customerId"), customer.getCustomerId())),
                                () -> {
                                    throw new EntityNotFoundException("Customer not found: " + estimateRequest.getCustomerName());
                                }
                        );
            }

            // 품목 조건
            if (estimateRequest.getProductName() != null) {
                // 서브 테이블인 estimateItem 과 조인
                Join<Object, Object> estimateItemJoin = root.join("items", JoinType.INNER);
                // estimateItem 테이블에서 itemName 이 일치하는지 확인
                predicates.add(criteriaBuilder.equal(estimateItemJoin.get("productName"), estimateRequest.getProductName()));
            }

            //estimateItem 항목에 hand 가 true 인 항목이 포함된 경우
            if (estimateRequest.getCondition() == EstimateRequest.Condition.HAND) {
                Join<Object, Object> estimateItemJoin = root.join("items", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(estimateItemJoin.get("hand"), true));
            } else if (estimateRequest.getCondition() == EstimateRequest.Condition.NORMAL) {
                Join<Object, Object> estimateItemJoin = root.join("items", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(estimateItemJoin.get("hand"), false));
            }

            //업무관리 견적서인경우
            if (estimateRequest.isTask()) {
                predicates.add(criteriaBuilder.isNotNull(root.get("task")));
            } else {
                predicates.add(criteriaBuilder.isNull(root.get("task")));
            }

            if (!estimateRequest.isReceipted()) {
                predicates.add(criteriaBuilder.equal(root.get("receipted"), false));
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
    public void updateEstimate(EstimateRequest request) {
        // 1. 기존 EstimateEntity 조회
        EstimateEntity estimate = estimateRepository.findById(request.getEstimateId())
                .orElseThrow(() -> new RuntimeException("해당 견적이 존재하지 않습니다."));

        // 2. 관련 엔티티 조회
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElse(null);
        CompanyEntity company = companyRepository.findById(request.getCompanyId()).orElse(null);
        UserEntity user = globalService.resolveUser(request.getUserId());

        TaskEntity task;
        if (request.getTaskId() != null) {
            task = taskRepository.findById(request.getTaskId())
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 업무 아이디입니다."));
        } else {
            task = estimate.getTask();
        }

        // 3. 기본 필드 업데이트 (예: 고객, 회사, 사용자, 업무 등)
        estimate.updateFields(customer, company, user);

        // 양방향 연관관계 설정 (task가 있을 경우)
        if (task != null) {
            estimate.setTask(task);
            task.setEstimate(estimate);
        } else {
            estimate.setTask(null);
        }

        // 4. 자식 엔티티(EstimateItem) 동기화
        // 새로운 아이템 리스트 생성
        List<EstimateItem> newItems = request.getItems().stream()
                .map(itemRequest -> {
                    StockEntity stock = null;
                    if (itemRequest.getStockId() != null) {
                        stock = stockRepository.findById(itemRequest.getStockId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 stockId로 Stock을 찾을 수 없습니다."));
                    }
                    // 기존 아이템이 존재할 경우 업데이트용 객체 생성, 없으면 신규 객체 생성
                    return itemRequest.toEntity2(estimate, stock);
                })
                .collect(Collectors.toList());

        if (newItems.isEmpty()) {
            deleteEstimate(request.getEstimateId());
            return;
        }

        // 기존 아이템 복사본 생성
        List<EstimateItem> existingItems = new ArrayList<>(estimate.getItems());

        //새로 생긴 아이템 리스트
        newItems = newItems.stream()
                .map(item -> {
                    // 만약 existingItems에 존재하지 않는다면
                    if (!existingItems.contains(item)) {
                        // 아이디를 수정하는 로직 (예: 기존 id 앞에 "new_" 접두어 추가)
                        item.setItemId(null);
                    }
                    return item;
                })
                .collect(Collectors.toList());

        // 4-1. 기존 아이템 중, newItems에 포함되지 않은 항목 삭제
        for (EstimateItem existingItem : existingItems) {
            boolean exists = newItems.stream()
                    .anyMatch(newItem -> newItem.getItemId() != null
                            && newItem.getItemId().equals(existingItem.getItemId()));
            if (!exists) {
                estimate.getItems().remove(existingItem);
                estimateItemRepository.delete(existingItem);
            }
        }

        // 4-2. 신규 아이템 추가 및 기존 아이템 업데이트
        for (EstimateItem newItem : newItems) {
            if (newItem.getItemId() != null) {
                // 기존 아이템이 있으면 업데이트
                Optional<EstimateItem> optionalExistingItem = estimate.getItems().stream()
                        .filter(existingItem -> existingItem.getItemId() != null
                                && existingItem.getItemId().equals(newItem.getItemId()))
                        .findFirst();
                if (optionalExistingItem.isPresent()) {
                    EstimateItem existingItem = optionalExistingItem.get();
                    existingItem.updateFields(newItem);
                }
            } else {
                // 신규 아이템 추가
                newItem.setEstimate(estimate);
                estimate.getItems().add(newItem);
            }
        }
        // 5. 최종 업데이트된 견적 저장
        estimateRepository.save(estimate);
    }


    //전표전환
    @Transactional
    public void toggleEstimateReceiptStatus(EstimateRequest request) {
        EstimateEntity estimate = estimateRepository.findById(request.getEstimateId())
                .orElseThrow(() -> new IllegalArgumentException("잘못된 아이디입니다."));

        boolean newReceiptStatus = !estimate.isReceipted();
        estimate.setReceipted(newReceiptStatus);

        if (newReceiptStatus) {
            createReceiptsFromEstimate(estimate, request);
            estimate.setReceiptDate(LocalDateTime.now());
        } else {
            deleteReceiptsLinkedToEstimate(estimate.getEstimateId());
            estimate.setReceiptDate(null);
        }
    }

    //전표생성
    private void createReceiptsFromEstimate(EstimateEntity estimate, EstimateRequest request) {
        for (EstimateItem item : estimate.getItems()) {
            ReceiptEntity receipt = new ReceiptEntity(
                    null,
                    estimate,
                    request.getReceiptDate(),
                    ReceiptCategory.SALES,
                    estimate.getCustomer(),
                    item.getStock(),
                    null,
                    item.getQuantity(),
                    item.getUnitPrice(),
                    "",
                    request.getNote(),
                    FromCategory.ESTIMATE
            );
            receiptRepository.save(receipt);
        }
    }

    //전표삭제
    private void deleteReceiptsLinkedToEstimate(UUID estimateId) {
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            //조건문 사용을 위한 객체
            List<Predicate> predicates = new ArrayList<>();

            // 품목 조건
            if (estimateId != null) {

                predicates.add(criteriaBuilder.equal(root.get("estimate").get("estimateId"), estimateId));
            }

            // 동적 조건을 조합하여 반환
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        receiptRepository.deleteAll(receiptEntities);
    }

    @Transactional
    public void saveEstimate(EstimateRequest request) {
        // 1. 필요한 엔티티 조회
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElse(null);
        CompanyEntity company = companyRepository.findById(request.getCompanyId()).orElse(null);
        //UserDetails userDetails = globalService.extractFromSecurityContext();

        UserEntity user = globalService.resolveUser(request.getUserId() == null || request.getUserId().isEmpty() ? "kosq3964" : request.getUserId());

        TaskEntity task = null;
        if (request.getTaskId() != null) {
            task = taskRepository.findById(request.getTaskId()).orElseThrow(() -> new RuntimeException("존재하지 않는 업무 아이디입니다."));
        }

        // 2. EstimateEntity 생성 및 자식 엔티티 연결
        EstimateEntity estimate = request.toEntity(customer, company, user, task, null);
        List<EstimateItem> items = request.getItems().stream()
                .map(itemRequest -> {
                    StockEntity stock = null;
                    if (itemRequest.getStockId() != null) {
                        stock = stockRepository.findById(itemRequest.getStockId())
                                .orElseThrow(() -> new IllegalArgumentException("해당 stockId로 Stock을 찾을 수 없습니다."));
                    }
                    EstimateItem item = itemRequest.toEntity(estimate, stock);
                    // 양방향 연관관계 설정
                    item.setEstimate(estimate);
                    return item;
                })
                .collect(Collectors.toList());

        // 부모 엔티티에 자식 엔티티 리스트 설정
        estimate.setItems(items);
        // cascade 옵션이 올바르게 설정되어 있다면, 이 한 번의 save 호출로 부모와 자식 모두 저장됩니다.
        if (task != null) {
            estimate.setTask(task);
            task.setEstimate(estimate);
        }
        EstimateEntity estimateEntity = estimateRepository.save(estimate); // task가 null이면 단순 저장, 존재하면 cascade에 의해 함께 저장
        request.setEstimateId(estimateEntity.getEstimateId());
    }


    public EstimateResponse getEstimate(UUID estimateId) {
        EstimateEntity estimate = estimateRepository.findById(estimateId).orElse(null);
        return globalService.convertToEstimateResponse(estimate);
    }


    @Transactional
    public void deleteEstimate(UUID estimateId) {
        EstimateEntity estimate = estimateRepository.findById(estimateId)
                .orElseThrow(() -> new RuntimeException("Estimate not found"));

        // 양방향 연관관계가 설정되어 있는 경우, 양쪽의 참조를 해제합니다.
        if (estimate.getTask() != null) {
            TaskEntity task = estimate.getTask();
            task.setEstimate(null);   // TaskEntity의 참조 해제
            estimate.setTask(null);     // EstimateEntity의 참조 해제
        }

        // 이후에 EstimateEntity를 삭제합니다.
        try {
            estimateRepository.delete(estimate);
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new IllegalStateException("견적서를 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
    }

    public List<EstimateResponse> getEstimatesByIds(List<UUID> estimateIds) {

        List<EstimateEntity> estimateEntities = estimateRepository.findAll((root, query, criteriaBuilder) -> {
            CriteriaBuilder.In<UUID> inClause = criteriaBuilder.in(root.get("receiptId"));
            for (UUID id : estimateIds) {
                inClause.value(id);
            }
            return inClause;
        });
        return estimateEntities
                .stream()
                .map(globalService::convertToEstimateResponse)
                .collect(Collectors.toList());
    }
}


