import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

function HLogin() {
  const [isLogin, setIsLogin] = useState(true); // Stato per alternare tra login e registrazione
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : {
          email, // Email dell'utente
          password, // Password dell'utente
          nome: name, // Nome dell'utente
          cognome: surname, // Cognome dell'utente
          telefono: phone, // Telefono dell'utente
        };

    fetch(`http://localhost:8080${endpoint}`, {
      method: "POST",
      headers: {
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
        if (isLogin) {
          // Dispatch Redux action per salvare il token e l'utente
          dispatch(loginSuccess({ token: data.token, user: data.user }));
          setSuccess("Accesso effettuato con successo!");
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
      <h1 className="text-center">{isLogin ? "Login" : "Registrazione"}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSurname" className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo cognome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Inserisci il tuo numero di telefono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
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
