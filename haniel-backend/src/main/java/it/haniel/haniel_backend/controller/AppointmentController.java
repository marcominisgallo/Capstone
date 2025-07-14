package it.haniel.haniel_backend.controller;

import it.haniel.haniel_backend.dto.AppointmentDto;
import it.haniel.haniel_backend.exception.ResourceNotFoundException;
import it.haniel.haniel_backend.model.Appointment;
import it.haniel.haniel_backend.model.ServiceEntity;
import it.haniel.haniel_backend.model.User;
import it.haniel.haniel_backend.service.AppointmentService;
import it.haniel.haniel_backend.service.ServiceService;
import it.haniel.haniel_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private ServiceService serviceService;

    @GetMapping("/{id}")
    public AppointmentDto getAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appuntamento non trovato"));
        return toDto(appointment);
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public AppointmentDto createAppointment(@RequestBody AppointmentDto dto) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User client)) {
            throw new ResourceNotFoundException("Utente autenticato non trovato");
        }

        // Validazione campi obbligatori
        if (dto.getNome() == null || dto.getNome().isBlank() ||
                dto.getCognome() == null || dto.getCognome().isBlank() ||
                dto.getTelefono() == null || dto.getTelefono().isBlank() ||
                dto.getDateTime() == null ||
                dto.getServiceIds() == null || dto.getServiceIds().isEmpty()) {
            throw new RuntimeException("Tutti i campi obbligatori devono essere compilati");
        }

        Set<ServiceEntity> services = dto.getServiceIds().stream()
                .map(id -> serviceService.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Servizio non trovato: " + id)))
                .collect(Collectors.toSet());

        Appointment appointment = new Appointment();
        appointment.setClient(client);
        appointment.setServices(services);
        appointment.setDateTime(dto.getDateTime());
        appointment.setNome(dto.getNome());
        appointment.setCognome(dto.getCognome());
        appointment.setTelefono(dto.getTelefono());
        appointment.setNoteAggiuntive(dto.getNoteAggiuntive());

        Appointment saved = appointmentService.save(appointment);
        return toDto(saved);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteById(id);
    }

    private AppointmentDto toDto(Appointment appointment) {
        AppointmentDto dto = new AppointmentDto();
        dto.setId(appointment.getId());
        dto.setClientId(appointment.getClient().getId());
        dto.setServiceIds(appointment.getServices().stream().map(ServiceEntity::getId).collect(Collectors.toSet()));
        dto.setDateTime(appointment.getDateTime());
        dto.setNome(appointment.getNome());
        dto.setCognome(appointment.getCognome());
        dto.setTelefono(appointment.getTelefono());
        dto.setNoteAggiuntive(appointment.getNoteAggiuntive());
        return dto;
    }
}