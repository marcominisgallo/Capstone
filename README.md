![Haniel Banner](./HanielBannerRepository.png)

## ITALIANO 🇮🇹

# 💇‍♀️ Progetto Finale – Haniel

## 🧴 Web App per salone di parrucchieri

Il progetto consiste nello sviluppo di una pagina web dinamica per il salone di parrucchieri **Haniel**, pensata per offrire un'esperienza digitale completa sia ai clienti che agli amministratori.

🎯 **Obiettivi del progetto:**

- Offrire un’interfaccia moderna e funzionale.
- Permettere agli utenti di consultare servizi, galleria e prenotare appuntamenti.
- Fornire agli amministratori un sistema completo per la gestione delle prenotazioni.

---

## 🛠️ Tecnologie utilizzate

| Frontend | Backend     | Altro                |
| -------- | ----------- | -------------------- |
| React    | Spring      | HTML/CSS             |
| Vite     | Spring Boot | JWT (autenticazione) |

---

## 🚀 Istruzioni per l'avvio del progetto

### 1. Clonare il repository

```bash
git clone https://github.com/marcominisgallo/Capstone.git
cd Capstone
```

### 2. Frontend

```bash
cd haniel-frontend
npm install
npm run dev
```

### 3. Backend

- Importa il progetto in **IntelliJ** o un IDE compatibile.
- Assicurati di avere **Java 17+** e **Maven** installati.
- Configura il file `env.properties` come descritto sotto.
- Avvia il progetto Spring Boot.

---

## 📄 Esempio di file `env.properties`

```properties
# PostgreSQL
postgresql.password=TuaPasswordPGSQL

# Cloudinary
cloud_name=TuoCloudName
api_key=TuaApiKey
api_secret=TuaApiSecret

# Gmail
gmail.username=TuaEmailGmail
gmail.password=TuaPasswordGmail
```

---

## 🧩 Struttura del progetto

```
Capstone/
│
├── Haniel-frontend/           # React + Vite
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── haniel-backend/            # Spring Boot
│   ├── src/
│   └── pom.xml
│
└── README.md
```

---

## 🔐 Funzionalità principali

- Autenticazione utenti (clienti e amministratori).
- Prenotazione, modifica e cancellazione appuntamenti.
- Galleria immagini e servizi consultabili.
- Dashboard admin per gestione avanzata.
- Design responsive e moderno.

---

## ☁️ Deployment

### Frontend

Può essere deployato su **Vercel** o **Netlify**:

- Imposta la directory di output (`dist`)
- Imposta il build command: `npm run build`

### Backend

Può essere deployato su:

- **Render**
- **Railway**
- **Heroku** (se compatibile con Java 17)

---

## 🧪 Comandi utili

| Comando               | Descrizione                   |
| --------------------- | ----------------------------- |
| `npm run dev`         | Avvia il frontend in dev mode |
| `npm run build`       | Builda il frontend in `dist/` |
| `mvn spring-boot:run` | Avvia il backend              |

---

## ⚙️ Requisiti

- Node.js 18+
- Java 17+
- PostgreSQL
- Maven
- IDE consigliati: IntelliJ IDEA / VS Code

---

## 👨‍🎓 Autore

Marco Minisgallo – Progetto finale EPICODE  
📧 Email: [marcominisgallo@yahoo.it]  
🔗 [LinkedIn](http://linkedin.com/in/marco-minisgallo-23991120a)

---

## ENGLISH 🇬🇧

# 💇‍♀️ Final Project – Haniel

## 🧴 Web App for Hair Salon

This project consists of developing a dynamic web page for the **Haniel** hair salon, designed to offer a complete digital experience for both clients and administrators.

🎯 **Project Objectives:**

- Provide a modern and functional user interface.
- Allow users to view services, browse the gallery, and book appointments.
- Offer administrators a full-featured system for managing bookings.

---

## 🛠️ Technologies Used

| Frontend | Backend     | Others     |
| -------- | ----------- | ---------- |
| React    | Spring      | HTML/CSS   |
| Vite     | Spring Boot | JWT (Auth) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/marcominisgallo/Capstone.git
cd Capstone
```

### 2. Frontend

```bash
cd haniel-frontend
npm install
npm run dev
```

### 3. Backend

- Import into **IntelliJ** or similar IDE.
- Make sure **Java 17+** and **Maven** are installed.
- Configure `env.properties` file (see below).
- Start Spring Boot backend.

---

## 📄 Example of `env.properties` file

```properties
# PostgreSQL
postgresql.password=YourPGSQLPassword

# Cloudinary
cloud_name=YourCloudName
api_key=YourApiKey
api_secret=YourApiSecret

# Gmail
gmail.username=YourGmailEmail
gmail.password=YourGmailPassword
```

---

## 🧩 Project Structure

```
Capstone/
│
├── Haniel-frontend/         # React + Vite
│   ├── src/
│   └── public/
│
├── haniel-backend/          # Spring Boot
│   ├── src/
│   └── pom.xml
│
└── README.md
```

---

## 🔐 Key Features

- User authentication (clients and admins).
- Appointment booking, editing, and deletion.
- Gallery and service viewing.
- Admin dashboard for advanced management.
- Fully responsive UI.

---

## ☁️ Deployment

### Frontend

Can be deployed via **Vercel** or **Netlify**:

- Set output folder (`dist`)
- Build command: `npm run build`

### Backend

Deployable on:

- **Render**
- **Railway**
- **Heroku** (Java 17+ compatibility)

---

## 🧪 Useful Commands

| Command               | Description                 |
| --------------------- | --------------------------- |
| `npm run dev`         | Start frontend in dev mode  |
| `npm run build`       | Build frontend into `dist/` |
| `mvn spring-boot:run` | Start backend               |

---

## ⚙️ Requirements

- Node.js 18+
- Java 17+
- PostgreSQL
- Maven
- IDE: IntelliJ IDEA / VS Code

---

## 👨‍🎓 Author

Marco Minisgallo – Final Project for EPICODE  
📧 Email: [marcominisgallo@yahoo.it]  
🔗 [LinkedIn](http://linkedin.com/in/marco-minisgallo-23991120a)
