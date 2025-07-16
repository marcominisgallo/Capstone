import React, { useState } from "react";
import { Accordion, Modal, Button } from "react-bootstrap";
import servicesData from "../data/servicesData";

function HServicesOffered() {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Servizi Offerti</h1>
      <Accordion>
        {servicesData.map((category) => (
          <Accordion.Item eventKey={category.id.toString()} key={category.id}>
            <Accordion.Header>{category.name}</Accordion.Header>
            <Accordion.Body>
              <ul>
                {category.services.map((service) => (
                  <li key={service.id} className="my-2">
                    <strong>{service.name}</strong> -{" "}
                    <em>{service.duration} minuti</em>
                    <br />
                    <Button
                      id="detailsButton"
                      variant="link"
                      className="p-0"
                      onClick={() => handleShowModal(service)}
                    >
                      Dettagli
                    </Button>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Modale per i dettagli del servizio */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {selectedService?.description || "Nessuna descrizione disponibile"}
          </p>
          <p>
            <strong>Durata:</strong> {selectedService?.duration} minuti
          </p>
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

export default HServicesOffered;
