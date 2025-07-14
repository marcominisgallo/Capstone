import React from "react";
import { Accordion } from "react-bootstrap"; // Importa Accordion da react-bootstrap
import servicesData from "../data/servicesData"; // Importa i dati dei servizi

function HServicesOffered() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Servizi Offerti</h1>
      <Accordion>
        {servicesData.map((category) => (
          <Accordion.Item eventKey={category.id.toString()} key={category.id}>
            <Accordion.Header>{category.name}</Accordion.Header>
            <Accordion.Body>
              <ul>
                {category.services.map((service) => (
                  <li key={service.id}>
                    <strong>{service.name}</strong> ({service.id}):{" "}
                    {service.description || "Nessuna descrizione disponibile"} -{" "}
                    <em>Durata: {service.duration} minuti</em>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default HServicesOffered;
