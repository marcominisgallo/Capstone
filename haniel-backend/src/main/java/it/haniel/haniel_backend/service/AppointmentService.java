package it.haniel.haniel_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> findByClient(User client) {
        return appointmentRepository.findByClient(client);
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public void deleteById(Long id) {
        appointmentRepository.deleteById(id);
    }
}