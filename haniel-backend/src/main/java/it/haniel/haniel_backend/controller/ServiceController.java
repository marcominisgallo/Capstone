package it.haniel.haniel_backend.controller;

import it.haniel.haniel_backend.dto.ServiceDto;
import it.haniel.haniel_backend.exception.ResourceNotFoundException;
import it.haniel.haniel_backend.model.ServiceEntity;
import it.haniel.haniel_backend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/services")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @GetMapping
    public List<ServiceDto> getAllServices() {
        return serviceService.findAll().stream().map(service -> {
            ServiceDto dto = new ServiceDto();
            dto.setId(service.getId());
            dto.setName(service.getName());
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ServiceDto getService(@PathVariable Long id) {
        ServiceEntity service = serviceService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servizio non trovato"));
        ServiceDto dto = new ServiceDto();
        dto.setId(service.getId());
        dto.setName(service.getName());
        return dto;
    }
}