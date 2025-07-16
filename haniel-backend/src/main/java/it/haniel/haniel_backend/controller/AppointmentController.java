package it.haniel.haniel_backend.controller;

import it.haniel.haniel_backend.dto.AppointmentDto;
import it.haniel.haniel_backend.exception.ResourceNotFoundException;
import it.haniel.haniel_backend.model.Appointment;
import it.haniel.haniel_backend.model.User;
import it.haniel.haniel_backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/{id}")
    public AppointmentDto getAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appuntamento non trovato"));
        return toDto(appointment);
    }

    @GetMapping("/count")
    public int countByDateTime(@RequestParam("dateTime") LocalDateTime dateTime) {
        return appointmentService.countByDateTime(dateTime);
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
                dto.getServiceName() == null || dto.getServiceName().isBlank()) {
            throw new RuntimeException("Tutti i campi obbligatori devono essere compilati");
        }

        // Controllo disponibilità collaboratori
        int count = appointmentService.countByDateTime(dto.getDateTime());
        if (count >= 2) {
            throw new RuntimeException("Non ci sono collaboratori disponibili in questo orario");
        }

        Appointment appointment = new Appointment();
        appointment.setClient(client);
        appointment.setServiceName(dto.getServiceName());
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
        dto.setServiceName(appointment.getServiceName());
        dto.setDateTime(appointment.getDateTime());
        dto.setNome(appointment.getNome());
        dto.setCognome(appointment.getCognome());
        dto.setTelefono(appointment.getTelefono());
        dto.setNoteAggiuntive(appointment.getNoteAggiuntive());
        return dto;
    }
}