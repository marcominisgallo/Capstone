package it.haniel.haniel_backend.controller;

import it.haniel.haniel_backend.enumeration.Role;
import it.haniel.haniel_backend.model.User;
import it.haniel.haniel_backend.security.JwtUtil;
import it.haniel.haniel_backend.service.EmailService;
import it.haniel.haniel_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.CLIENT);
        if (user.getNome() == null || user.getCognome() == null || user.getTelefono() == null) {
            throw new RuntimeException("Nome, cognome e telefono sono obbligatori");
        }
        userService.save(user);
        try {
            emailService.sendRegistrationEmail(user.getEmail(), user.getNome());
        } catch (Exception e) {
            System.err.println("Errore invio email: " + e.getMessage());
        }
        return Map.of("message", "Registrazione avvenuta con successo");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String password = body.get("password");
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Utente non trovato"));
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new RuntimeException("Password errata");
            }
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}