package it.haniel.haniel_backend.repository;

import it.haniel.haniel_backend.model.Appointment;
import it.haniel.haniel_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByClient(User client);

    int countByDateTime(LocalDateTime dateTime);
}