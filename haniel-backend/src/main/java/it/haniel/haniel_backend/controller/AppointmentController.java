package it.haniel.haniel_backend.controller;

import it.haniel.haniel_backend.dto.AppointmentDto;
import it.haniel.haniel_backend.exception.ResourceNotFoundException;
import it.haniel.haniel_backend.model.Appointment;
import it.haniel.haniel_backend.model.User;
import it.haniel.haniel_backend.service.AppointmentService;
import it.haniel.haniel_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

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

    @GetMapping
    public List<AppointmentDto> getAppointmentsByUser(@RequestParam("user") String email) {
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utente non trovato"));
        List<Appointment> appointments = appointmentService.findByClient(user);
        return appointments.stream().map(this::toDto).toList();
    }

    @GetMapping("/check-availability")
    public boolean checkAvailability(@RequestParam("dateTime") LocalDateTime dateTime) {
        int count = appointmentService.countByDateTime(dateTime);
        // true se c'è almeno un collaboratore disponibile (max 2 prenotazioni per slot)
        return count < 2;
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

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CLIENT')")
    public AppointmentDto updateAppointment(@PathVariable Long id, @RequestBody AppointmentDto dto) {
        Appointment appointment = appointmentService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appuntamento non trovato"));

        // Solo il proprietario può modificare la prenotazione
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User client) || !appointment.getClient().getId().equals(client.getId())) {
            throw new RuntimeException("Non autorizzato a modificare questa prenotazione");
        }

        // Aggiorna i campi modificabili
        appointment.setServiceName(dto.getServiceName());
        appointment.setDateTime(dto.getDateTime());
        appointment.setNome(dto.getNome());
        appointment.setCognome(dto.getCognome());
        appointment.setTelefono(dto.getTelefono());
        appointment.setNoteAggiuntive(dto.getNoteAggiuntive());

        Appointment updated = appointmentService.save(appointment);
        return toDto(updated);
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