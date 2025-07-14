import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

function HBook() {
  const [serviceIds, setServiceIds] = useState([]); // Stato per gli id dei servizi scelti
  const [date, setDate] = useState(""); // Stato per la data dell'appuntamento
  const [time, setTime] = useState(""); // Stato per l'orario dell'appuntamento
  const [nome, setNome] = useState(""); // Stato per il nome
  const [cognome, setCognome] = useState(""); // Stato per il cognome
  const [telefono, setTelefono] = useState(""); // Stato per il telefono
  const [noteAggiuntive, setNoteAggiuntive] = useState(""); // Stato per le note aggiuntive
  const [success, setSuccess] = useState(""); // Stato per il messaggio di successo
  const [error, setError] = useState(""); // Stato per il messaggio di errore

  const token = useSelector((state) => state.auth.token); // Recupera il token JWT dal Redux store

  // Funzione per controllare se il giorno è domenica o lunedì
  const isDayDisabled = (date) => {
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 0 = Domenica, 1 = Lunedì, ..., 6 = Sabato
    return dayOfWeek === 0 || dayOfWeek === 1; // Disabilita domenica e lunedì
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDayDisabled(date)) {
      setError("Non è possibile prenotare di domenica o lunedì.");
      setSuccess("");
      return;
    }

    const payload = {
      serviceIds,
      dateTime: `${date}T${time}`, // Combina data e ora in formato ISO
      nome,
      cognome,
      telefono,
      noteAggiuntive: noteAggiuntive || null, // Se vuoto, invia null
    };

    fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Includi il token JWT nell'header Authorization
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
      })
      .catch((error) => {
        setError("Errore: " + error.message);
        setSuccess("");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Prenota</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formServiceIds" className="mb-3">
          <Form.Label>Servizi</Form.Label>
          <Form.Control
            id="ServiceIdsInput"
            type="text"
            placeholder="Inserisci gli ID dei servizi separati da virgola (es. 1,2)"
            value={serviceIds.join(",")}
            onChange={(e) =>
              setServiceIds(
                e.target.value.split(",").map((id) => parseInt(id.trim()))
              )
            }
            required
          />
        </Form.Group>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            id="DateInput"
            type="date"
            value={date}
            onChange={(e) => {
              const selectedDate = e.target.value;
              if (isDayDisabled(selectedDate)) {
                setError("Non è possibile selezionare domenica o lunedì.");
                setDate(""); // Resetta il valore se il giorno è disabilitato
              } else {
                setError("");
                setDate(selectedDate);
              }
            }}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTime" className="mb-3">
          <Form.Label>Orario</Form.Label>
          <Form.Select
            id="TimeInput"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleziona un orario
            </option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formNome" className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            id="NomeInput"
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
            id="CognomeInput"
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
            id="TelefonoInput"
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
            id="NoteAggiuntiveInput"
            as="textarea"
            placeholder="Inserisci eventuali note aggiuntive (opzionale)"
            value={noteAggiuntive}
            onChange={(e) => setNoteAggiuntive(e.target.value)}
          />
        </Form.Group>
        <Button id="LoginButton" type="submit" className="w-100 mb-4">
          Prenota
        </Button>
      </Form>
    </div>
  );
}

export default HBook;
