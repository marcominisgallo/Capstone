package it.haniel.haniel_backend.service;

import it.haniel.haniel_backend.model.ServiceEntity;
import it.haniel.haniel_backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;

    public List<ServiceEntity> findAll() {
        return serviceRepository.findAll();
    }

    public Optional<ServiceEntity> findById(Long id) {
        return serviceRepository.findById(id);
    }
}