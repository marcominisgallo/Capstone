package it.haniel.haniel_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentDto {
    private Long id;
    private Long clientId;
    private String serviceName; // Campo stringa
    private LocalDateTime dateTime;
    private String nome;
    private String cognome;
    private String telefono;
    private String noteAggiuntive;
}