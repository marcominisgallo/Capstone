package it.haniel.haniel_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String to, String nome) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Conferma di registrazione");
        message.setText("Ciao " + nome + ", la tua registrazione è avvenuta con successo!");
        mailSender.send(message);
    }
}