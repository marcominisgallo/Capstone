import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { Form, Button, Alert } from "react-bootstrap";

function HLogin() {
  const [isLogin, setIsLogin] = useState(true); // Stato per alternare tra login e registrazione
  const [nome, setNome] = useState(""); // Stato per il campo "Nome"
  const [cognome, setCognome] = useState(""); // Stato per il campo "Cognome"
  const [telefono, setTelefono] = useState(""); // Stato per il campo "Telefono"
  const [email, setEmail] = useState(""); // Stato per il campo "Email"
  const [password, setPassword] = useState(""); // Stato per il campo "Password"
  const [error, setError] = useState(""); // Stato per gestire errori
  const [success, setSuccess] = useState(""); // Stato per gestire successi

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Recupera il token dal Redux store
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : { email, password, nome, cognome, telefono }; // Aggiungi i campi richiesti per la registrazione

    fetch(`http://localhost:8080${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Aggiungi il token JWT se esiste
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
        if (isLogin) {
          // Dispatch Redux action per salvare il token e l'utente
          dispatch(loginSuccess({ token: data.token, user: data.user }));
          setSuccess("Accesso effettuato con successo!");
          navigate("/prenota"); // Reindirizza al path per prenotare
        } else {
          setSuccess("Registrazione completata con successo!");
        }
        setError("");
      })
      .catch((error) => {
        setError("Errore: " + error.message);
        setSuccess("");
      });
  };

  return (
    <div className="container mt-5">
      <h1 id="LoginTitle" className="text-center">
        {isLogin ? "Login" : "Registrazione"}
      </h1>
      {error && (
        <Alert id="LoginError" variant="danger">
          {error}
        </Alert>
      )}
      {success && (
        <Alert id="LoginSuccess" variant="success">
          {success}
        </Alert>
      )}
      <Form id="LoginForm" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
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
          </>
        )}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="EmailInput"
            type="email"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="PasswordInput"
            type="password"
            placeholder="Inserisci la tua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button id="LoginButton" type="submit" className="w-100">
          {isLogin ? "Accedi" : "Registrati"}
        </Button>
      </Form>
      <div className="text-center my-3">
        <Button
          id="LoginOption"
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Non hai un account? Registrati"
            : "Hai già un account? Accedi"}
        </Button>
      </div>
    </div>
  );
}

export default HLogin;
