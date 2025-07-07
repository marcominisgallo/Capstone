package it.haniel.haniel_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class AppointmentDto {
    private Long id;
    private Long clientId;
    private Set<Long> serviceIds;
    private LocalDateTime dateTime;
}