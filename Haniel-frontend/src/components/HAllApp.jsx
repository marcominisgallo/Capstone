import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function HAllApp() {
  const [bookingsByDay, setBookingsByDay] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/appointments/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dati ricevuti dal backend:", data); // Debug

        // Raggruppa le prenotazioni per giorno
        const groupedBookings = data.reduce((acc, booking) => {
          const bookingDate = new Date(booking.dateTime)
            .toISOString()
            .split("T")[0]; // Usa formato YYYY-MM-DD
          if (!acc[bookingDate]) {
            acc[bookingDate] = [];
          }
          acc[bookingDate].push(booking);
          return acc;
        }, {});

        setBookingsByDay(groupedBookings);
      })
      .catch((error) =>
        console.error("Errore nel fetch delle prenotazioni:", error)
      );
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Tutte le Prenotazioni</h1>
      {Object.keys(bookingsByDay).length === 0 ? (
        <p className="text-center">Nessuna prenotazione disponibile.</p>
      ) : (
        Object.keys(bookingsByDay)
          .sort((a, b) => new Date(a) - new Date(b)) // Ordina le date in ordine crescente
          .map((day, index) => (
            <div key={index}>
              <h3>
                {new Date(day).toLocaleDateString("it-IT", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: "25%" }}>Ora</th>
                    <th style={{ width: "25%" }}>Servizio</th>
                    <th style={{ width: "25%" }}>Cliente</th>
                    <th style={{ width: "25%" }}>Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingsByDay[day].map((booking, i) => (
                    <tr key={i}>
                      <td>
                        {new Date(booking.dateTime).toLocaleTimeString(
                          "it-IT",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td>{booking.serviceName}</td>
                      <td>
                        {booking.nome} {booking.cognome}
                      </td>
                      <td>{booking.telefono}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))
      )}
    </div>
  );
}

export default HAllApp;
