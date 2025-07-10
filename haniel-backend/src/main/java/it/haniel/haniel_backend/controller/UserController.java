package it.haniel.haniel_backend.controller;

import it.haniel.haniel_backend.dto.UserDto;
import it.haniel.haniel_backend.exception.ResourceNotFoundException;
import it.haniel.haniel_backend.model.User;
import it.haniel.haniel_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utente non trovato"));
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setNome(user.getNome());
        dto.setCognome(user.getCognome());
        dto.setTelefono(user.getTelefono());
        return dto;
    }
}