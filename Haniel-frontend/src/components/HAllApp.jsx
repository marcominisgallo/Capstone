import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function HAllApp() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/appointments/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Filtra le prenotazioni dal giorno precedente in poi
        const today = new Date();
        const filteredBookings = data.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate >= today;
        });
        setBookings(filteredBookings);
      })
      .catch((error) =>
        console.error("Errore nel fetch delle prenotazioni:", error)
      );
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Tutte le Prenotazioni</h1>
      {bookings.length === 0 ? (
        <p className="text-center">Nessuna prenotazione disponibile.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.date}>
            <h3>{booking.date}</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ora</th>
                  <th>Servizio</th>
                  <th>Cliente</th>
                </tr>
              </thead>
              <tbody>
                {booking.timeSlots.map((slot) => (
                  <tr key={slot}>
                    <td>{slot}</td>
                    <td>{booking.service}</td>
                    <td>
                      {booking.nome} {booking.cognome}
                    </td>
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
