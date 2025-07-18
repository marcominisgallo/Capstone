import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function HAdminApp() {
  const [appointments, setAppointments] = useState([]);
  const token = useSelector((state) => state.auth.token); // Recupera il token per l'autenticazione

  useEffect(() => {
    // Recupera gli appuntamenti dal backend
    fetch("http://localhost:8080/api/appointments/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero degli appuntamenti");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  }, [token]);

  // Calcola le date della settimana corrente (da martedì a sabato)
  const today = new Date();
  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 2)
  ); // Martedì
  const daysOfWeek = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  // Organizza gli appuntamenti per giorno della settimana
  const appointmentsByDay = daysOfWeek.map((day) =>
    appointments.filter(
      (appointment) =>
        new Date(appointment.dateTime).toLocaleDateString() ===
        day.toLocaleDateString()
    )
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center">Appuntamenti Settimanali</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index}>
                {day.toLocaleDateString("it-IT", { weekday: "long" })}{" "}
                <span
                  style={{
                    color:
                      day.toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? "#E69A00"
                        : "inherit",
                  }}
                >
                  (
                  {day.toLocaleDateString("it-IT", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                  )
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {appointmentsByDay.map((appointmentsForDay, index) => (
              <td key={index}>
                {appointmentsForDay.length > 0 ? (
                  appointmentsForDay.map((appointment) => (
                    <div key={appointment.id} className="mb-3">
                      <strong>{appointment.serviceName}</strong> <br />
                      {`${appointment.nome} ${appointment.cognome}`} <br />
                      {new Date(appointment.dateTime).toLocaleTimeString()}
                    </div>
                  ))
                ) : (
                  <p>Nessun appuntamento</p>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default HAdminApp;
