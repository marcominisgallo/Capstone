import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Offcanvas,
  Modal,
} from "react-bootstrap";
import servicesData from "../data/servicesData";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash } from "react-bootstrap-icons";

function HBook() {
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [noteAggiuntive, setNoteAggiuntive] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("Utente autenticato:", user); // Debug per verificare il valore di `user`
    console.log("Token:", token); // Debug per verificare il valore di `token`
  }, [user, token]);

  // Genera gli orari disponibili
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 10; hour <= 17; hour++) {
        slots.push(`${hour}:00`);
      }
      setTimeSlots(slots);
    };
    generateTimeSlots();
  }, []);

  // Filtra gli orari disponibili interrogando il backend
  useEffect(() => {
    if (date) {
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 1) {
        setError("Non è possibile prenotare di domenica o lunedì.");
        setAvailableTimeSlots([]);
        return;
      }

      const filteredSlots = [];
      const promises = timeSlots.map((slot) => {
        const dateTime = `${date}T${slot}`;
        return fetch(
          `http://localhost:8080/api/appointments/count?dateTime=${dateTime}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Errore nel recupero della disponibilità");
            }
            return response.json();
          })
          .then((count) => {
            if (count < 2) {
              filteredSlots.push(slot);
            }
          })
          .catch((error) => {
            console.error("Errore:", error);
          });
      });

      Promise.all(promises)
        .then(() => {
          filteredSlots.sort((a, b) => {
            const [hourA] = a.split(":").map(Number);
            const [hourB] = b.split(":").map(Number);
            return hourA - hourB;
          });
          setAvailableTimeSlots(filteredSlots);
        })
        .catch((error) => {
          setError("Errore nel recupero degli orari disponibili.");
        });
    }
  }, [date, timeSlots, token]);

  // Recupera le prenotazioni
  const fetchBookings = () => {
    if (!user || !token) {
      setError("Errore: utente non autenticato.");
      return;
    }

    const endpoint =
      user.role === "ADMIN"
        ? "/api/bookings/all"
        : `/api/bookings?user=${user.email}`;

    fetch(`http://localhost:8080${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero delle prenotazioni");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Errore:", error);
        setError("Errore nel recupero delle prenotazioni.");
      });
  };

  // Gestione del form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedService ||
      !date ||
      !selectedTimeSlot ||
      !nome ||
      !cognome ||
      !telefono
    ) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }

    const payload = {
      serviceName: selectedService,
      dateTime: `${date}T${selectedTimeSlot}`,
      nome,
      cognome,
      telefono,
      noteAggiuntive: noteAggiuntive || null,
    };

    fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("Prenotazione effettuata con successo!");
        setError("");
        dispatch({ type: "ADD_BOOKING", payload: data });
      })
      .catch((error) => {
        setError("Errore: " + error.message);
        setSuccess("");
      });
  };

  // Modifica o cancella una prenotazione
  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  const handleDeleteBooking = (bookingId) => {
    fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella cancellazione della prenotazione");
        }
        setBookings((prevBookings) =>
          prevBookings.filter((b) => b.id !== bookingId)
        );
        setSuccess("Prenotazione cancellata con successo!");
      })
      .catch((error) => {
        console.error("Errore:", error);
        setError("Errore nella cancellazione della prenotazione.");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Prenota</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => {
          setShowOffcanvas(true);
          fetchBookings();
        }}
      >
        Visualizza Prenotazioni
      </Button>
      <Form onSubmit={handleSubmit}>
        {/* Form per la prenotazione */}
        <Form.Group controlId="formService" className="mb-3">
          <Form.Label>Servizio</Form.Label>
          <Form.Select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleziona un servizio
            </option>
            {servicesData.map((category) =>
              category.services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTime" className="mb-3">
          <Form.Label>Orario</Form.Label>
          <Row>
            {availableTimeSlots.map((slot) => (
              <Col key={slot} xs={6} md={4} lg={3} className="mb-3">
                <Card
                  className={`text-center ${
                    selectedTimeSlot === slot ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedTimeSlot(slot)}
                  style={{ cursor: "pointer", backgroundColor: "#BFD3BF" }}
                >
                  <Card.Body>
                    <Card.Title>{slot}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Form.Group>
        <Form.Group controlId="formNome" className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCognome" className="mb-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo cognome"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTelefono" className="mb-3">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Inserisci il tuo numero di telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNoteAggiuntive" className="mb-3">
          <Form.Label>Note Aggiuntive</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Inserisci eventuali note aggiuntive (opzionale)"
            value={noteAggiuntive}
            onChange={(e) => setNoteAggiuntive(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="w-100">
          Prenota
        </Button>
      </Form>

      {/* Offcanvas per visualizzare le prenotazioni */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Prenotazioni</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div>
                  <strong>{booking.serviceName}</strong> - {booking.dateTime}{" "}
                  <br />
                  {booking.nome} {booking.cognome} - {booking.telefono}
                </div>
                <div>
                  <Pencil
                    className="text-primary me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditBooking(booking)}
                  />
                  <Trash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteBooking(booking.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Nessuna prenotazione disponibile.</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modale per modificare o cancellare una prenotazione */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <div>
              <p>
                <strong>Servizio:</strong> {selectedBooking.serviceName}
              </p>
              <p>
                <strong>Data e Ora:</strong> {selectedBooking.dateTime}
              </p>
              <p>
                <strong>Nome:</strong> {selectedBooking.nome}
              </p>
              <p>
                <strong>Cognome:</strong> {selectedBooking.cognome}
              </p>
              <p>
                <strong>Telefono:</strong> {selectedBooking.telefono}
              </p>
              <p>
                <strong>Note:</strong>{" "}
                {selectedBooking.noteAggiuntive || "Nessuna nota"}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HBook;
