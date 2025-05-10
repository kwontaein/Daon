package com.example.daon.customer.repository;

import com.example.daon.customer.model.CustomerBillEntity;
import com.example.daon.customer.model.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerBillRepository extends JpaRepository<CustomerBillEntity, UUID>, JpaSpecificationExecutor<CustomerBillEntity> {
    Optional<CustomerBillEntity> findByCustomer(@Param("customer") CustomerEntity customer);
}
