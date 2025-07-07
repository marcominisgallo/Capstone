package it.haniel.haniel_backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private Role role;
}