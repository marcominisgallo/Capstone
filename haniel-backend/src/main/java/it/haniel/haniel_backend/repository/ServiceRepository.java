package it.haniel.haniel_backend.repository;

import it.haniel.haniel_backend.model.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}