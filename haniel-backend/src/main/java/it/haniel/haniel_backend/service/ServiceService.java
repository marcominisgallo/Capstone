package it.haniel.haniel_backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@ServiceAnnotation
public class ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;

    public List<Service> findAll() {
        return serviceRepository.findAll();
    }

    public Optional<Service> findById(Long id) {
        return serviceRepository.findById(id);
    }
}