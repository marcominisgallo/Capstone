import image0 from "../assets/pic/image0.jpeg";
import image1 from "../assets/pic/image1.jpeg";
import { Col, Container, Row } from "react-bootstrap";

function HWhoWeAre() {
  return (
    <Container>
      <Row>
        <Col xs={12} lg={6}>
          <h1 className="mt-5 mb-3">Chi siamo</h1>
          <h4 className="mt-5">Un Luogo Pensato per Te</h4>
          <p>
            L’ambiente è moderno, elegante e accogliente, studiato per regalare
            una sensazione di benessere profondo. Dalla selezione musicale alla
            pausa caffè, ogni elemento concorre a farti sentire accolto e al
            centro di un’esperienza esclusiva, dove la bellezza diventa un atto
            di consapevolezza e stile.
          </p>
          <h4 className="mt-4">Il Cuore Creativo di Haniel</h4>
          <p>
            Alla guida c’è Matteo Lecca, fondatore e hairstylist con oltre
            vent’anni di esperienza nel settore, che insieme al suo team esperto
            lavora con passione, professionalità ed empatia per valorizzare la
            bellezza autentica di ogni persona.
          </p>
          <h4 className="mt-4">Ascolto, Tecnica, Stile</h4>
          <p>
            Lo stile Haniel nasce dall’ascolto e si traduce in tagli, pieghe,
            colorazioni, effetti luce e trattamenti mirati per la salute del
            capello, realizzati con tecniche all’avanguardia e grande cura del
            dettaglio.
          </p>
          <h4 className="mt-4">L'Essenza di Haniel</h4>
          <p className="mb-5">
            Esperienza, serietà, competenza, passione, stile ed esclusività si
            uniscono in un unico spazio dove la ricercatezza e il senso estetico
            si fondono con un’autentica visione artistica. Haniel è molto più di
            un hair salon: è un luogo intimo e riservato, dove ogni dettaglio è
            pensato per offrire un’esperienza unica e altamente personalizzata.
          </p>
        </Col>
        <Col>
          <Row>
            <Col xs={10} className="offset-2 mt-5">
              <img src={image0} alt="" className="w-100 h-100 mt-3" />
            </Col>
            <Col xs={10} className="offset-2 mt-5">
              <img src={image1} alt="" className="w-100 h-75 mt-3" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HWhoWeAre;
