package com.example.daon.estimate.service;

import com.example.daon.admin.model.UserEntity;
import com.example.daon.company.model.CompanyEntity;
import com.example.daon.customer.model.CustomerEntity;
import com.example.daon.customer.repository.CustomerRepository;
import com.example.daon.estimate.dto.request.EstimateItemRequest;
import com.example.daon.estimate.dto.request.EstimateRequest;
import com.example.daon.estimate.dto.response.EstimateResponse;
import com.example.daon.estimate.model.EstimateEntity;
import com.example.daon.estimate.model.EstimateItem;
import com.example.daon.estimate.repository.EstimateItemRepository;
import com.example.daon.estimate.repository.EstimateRepository;
import com.example.daon.global.exception.ResourceInUseException;
import com.example.daon.global.service.ConvertResponseService;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
    private final ReceiptRepository receiptRepository;
    private final ConvertResponseService convertResponseService;
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
                if (estimateRequest.isReceipted()) {
                    predicates.add(criteriaBuilder.equal(root.get("receipted"), false));
                }
            } else {
                predicates.add(criteriaBuilder.isNull(root.get("task")));
            }

            predicates.add(criteriaBuilder.isNotNull(root.get("task").get("completeAt")));

            // 동적 조건 조합
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        return estimateEntities
                .stream()
                .map(convertResponseService::convertToEstimateResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateEstimate(EstimateRequest estimateRequest) {
        EstimateEntity estimate = globalService.findEstimate(estimateRequest.getEstimateId());
        CustomerEntity customer = globalService.findCustomer(estimateRequest.getCustomerId());
        CompanyEntity company = globalService.findCompany(estimateRequest.getCompanyId());
        UserEntity user = globalService.resolveUser(estimateRequest.getUserId());

        TaskEntity task = (estimateRequest.getTaskId() != null)
                ? globalService.findTask(estimateRequest.getTaskId())
                : estimate.getTask();

        estimate.updateFields(customer, company, user, estimateRequest);

        // 양방향 연관관계 설정
        estimate.setTask(task);
        if (task != null) {
            task.setEstimate(estimate);
        }

        List<EstimateItem> newItems = mapToEstimateItems(estimateRequest.getItems(), estimate);
        if (newItems.isEmpty()) {
            deleteEstimate(estimateRequest);
            return;
        }

        syncEstimateItems(estimate, newItems);
        estimateRepository.save(estimate);
    }

    // itemRequest -> EstimateItem 리스트 변환
    private List<EstimateItem> mapToEstimateItems(List<EstimateItemRequest> itemRequests, EstimateEntity estimate) {
        return itemRequests.stream()
                .map(itemRequest -> {
                    StockEntity stock = (itemRequest.getStockId() != null)
                            ? stockRepository.findById(itemRequest.getStockId())
                            .orElseThrow(() -> new IllegalArgumentException("해당 stockId로 Stock을 찾을 수 없습니다."))
                            : null;
                    return itemRequest.toEntity2(estimate, stock);
                })
                .collect(Collectors.toList());
    }

    // 기존 항목과 새로운 항목 동기화
    private void syncEstimateItems(EstimateEntity estimate, List<EstimateItem> newItems) {
        List<EstimateItem> existingItems = new ArrayList<>(estimate.getItems());

        // 새로운 아이템 중 기존에 없는 것은 itemId를 null로 설정해 신규로 처리
        newItems.forEach(item -> {
            if (item.getItemId() != null && existingItems.stream()
                    .noneMatch(e -> e.getItemId().equals(item.getItemId()))) {
                item.setItemId(null);
            }
        });

        // 1) 기존에 없어진 항목 삭제
        existingItems.stream()
                .filter(existing -> newItems.stream()
                        .noneMatch(newItem -> newItem.getItemId() != null
                                && newItem.getItemId().equals(existing.getItemId())))
                .forEach(existing -> {
                    estimate.getItems().remove(existing);
                    estimateItemRepository.delete(existing);
                });

        // 2) 신규 추가 및 업데이트
        for (EstimateItem newItem : newItems) {
            if (newItem.getItemId() != null) {
                estimate.getItems().stream()
                        .filter(existing -> existing.getItemId() != null
                                && existing.getItemId().equals(newItem.getItemId()))
                        .findFirst()
                        .ifPresent(existing -> existing.updateFields(newItem));
            } else {
                newItem.setEstimate(estimate);
                estimate.getItems().add(newItem);
            }
        }
    }


    //전표전환
    @Transactional
    public void toggleEstimateReceiptStatus(EstimateRequest estimateRequest) {
        EstimateEntity estimate = globalService.findEstimate(estimateRequest.getEstimateId());

        if (estimate == null) {
            return;
        }

        if (estimate.getTask() != null) {
            estimateRequest.setTaskId(estimate.getTask().getTaskId());
        }

        boolean newReceiptStatus = !estimate.isReceipted();
        estimate.setReceipted(newReceiptStatus);

        if (newReceiptStatus) {
            createReceiptsFromEstimate(estimate, estimateRequest);
            estimate.setReceiptDate(LocalDateTime.now());
            estimateRequest.setReceiptId(UUID.randomUUID());
        } else {
            deleteReceiptsLinkedToEstimate(estimate.getEstimateId());
            estimate.setReceiptDate(null);
            estimateRepository.save(estimate);
        }
    }


    //전표생성
    private void createReceiptsFromEstimate(EstimateEntity estimate, EstimateRequest estimateRequest) {
        for (EstimateItem item : estimate.getItems()) {
            StockEntity stock = item.getStock();
            Integer quantity = item.getQuantity();

            // 전표 생성
            ReceiptEntity receipt = new ReceiptEntity(
                    null,
                    estimate,
                    estimateRequest.getReceiptDate(),
                    ReceiptCategory.SALES,
                    estimate.getCustomer(),
                    stock,
                    null,
                    quantity,
                    BigDecimal.valueOf(quantity).multiply(item.getUnitPrice()),
                    "",
                    estimateRequest.getMemo(),
                    FromCategory.ESTIMATE
            );

            // 재고 수량 차감 (출고)
            if (quantity != null && stock != null) {
                globalService.adjustStockQuantity(stock, quantity, receipt.getCategory(), false); // 출고 처리
            }

            // 총합 갱신 및 저장
            globalService.updateDailyTotal(receipt.getTotalPrice(), receipt.getCategory(), receipt.getTimeStamp());
            receiptRepository.save(receipt);
        }
    }


    //전표삭제
    private void deleteReceiptsLinkedToEstimate(UUID estimateId) {
        List<ReceiptEntity> receiptEntities = receiptRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (estimateId != null) {
                predicates.add(criteriaBuilder.equal(root.get("estimate").get("estimateId"), estimateId));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        try {
            for (ReceiptEntity receipt : receiptEntities) {
                // 일일 총합 롤백
                globalService.updateDailyTotal(receipt.getTotalPrice().negate(), receipt.getCategory(), receipt.getTimeStamp());

                // 🔁 재고 복원 (롤백 처리)
                if (receipt.getQuantity() != null && receipt.getStock() != null) {
                    globalService.adjustStockQuantity(receipt.getStock(), receipt.getQuantity(), receipt.getCategory(), true); // 롤백 처리
                }
            }
            receiptRepository.deleteAll(receiptEntities);
            receiptRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new ResourceInUseException("전표를 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
    }

    private List<EstimateItem> mapItemsWithStocks(EstimateRequest request, EstimateEntity estimate) {
        return request.getItems().stream()
                .map(itemRequest -> {
                    StockEntity stock = itemRequest.getStockId() != null
                            ? stockRepository.findById(itemRequest.getStockId())
                            .orElseThrow(() -> new IllegalArgumentException("해당 stockId로 Stock을 찾을 수 없습니다."))
                            : null;
                    EstimateItem item = itemRequest.toEntity(estimate, stock);
                    item.setEstimate(estimate); // 양방향 설정
                    return item;
                })
                .collect(Collectors.toList());
    }


    @Transactional
    public void saveEstimate(EstimateRequest request) {
        // 1. 엔티티 조회
        CustomerEntity customer = globalService.findCustomer(request.getCustomerId());
        CompanyEntity company = globalService.findCompany(request.getCompanyId());
        UserEntity user = globalService.resolveUser(request.getUserId());
        TaskEntity task = globalService.findTask(request.getTaskId());

        // 2. EstimateEntity 생성
        EstimateEntity estimate = request.toEntity(customer, company, user, task, null);

        // 3. 자식 엔티티 설정
        List<EstimateItem> items = mapItemsWithStocks(request, estimate);
        estimate.setItems(items);

        // 4. 업무 연관 설정
        if (task != null) {
            estimate.setTask(task);
            task.setEstimate(estimate);
        }

        // 5. 저장 및 estimateId 설정
        EstimateEntity savedEstimate = estimateRepository.save(estimate);
        request.setEstimateId(savedEstimate.getEstimateId());
    }


    public EstimateResponse getEstimate(UUID estimateId) {
        EstimateEntity estimate = globalService.findEstimate(estimateId);
        return convertResponseService.convertToEstimateResponse(estimate);
    }

    @Transactional
    public void deleteEstimate(EstimateRequest estimateRequest) {
        EstimateEntity estimate = globalService.findEstimate(estimateRequest.getEstimateId());
        if (estimate == null) {
            return;
        }
        TaskEntity task = estimate.getTask();

        // 양방향 연관관계가 설정되어 있는 경우, 양쪽의 참조를 해제합니다.
        if (task != null) {
            task.setEstimate(null);
            estimate.setTask(null);
            task.setCompleteAt(null); // 여기서 바로 처리 가능
        }

        try {
            estimateRepository.delete(estimate);
            estimateRepository.flush();// FK 제약조건 위반 방지를 위해 삭제 즉시 반영
            if (task != null) {
                taskRepository.save(task);
            }
        } catch (DataIntegrityViolationException e) {
            // 외래키 제약 조건 위반 처리
            throw new ResourceInUseException("견적서를 삭제할 수 없습니다. 관련된 데이터가 존재합니다.", e);
        }
    }

    public List<EstimateResponse> getEstimatesByIds(List<UUID> estimateIds) {
        List<EstimateEntity> estimateEntities = estimateRepository.findAll((root, query, criteriaBuilder) -> {
            CriteriaBuilder.In<UUID> inClause = criteriaBuilder.in(root.get("estimateId"));
            for (UUID id : estimateIds) {
                inClause.value(id);
            }
            return inClause;
        });
        return estimateEntities
                .stream()
                .map(convertResponseService::convertToEstimateResponse)
                .collect(Collectors.toList());
    }
}


