import { Card, Col, Image, Row } from "react-bootstrap";
import HMax from "./HMax";
import image0 from "../assets/pic/image0.jpeg";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "react-bootstrap-icons";

function HContactS() {
  return (
    <HMax>
      <Row className="mt-4">
        <Col xs={12}>
          <h1 className="text-center">Contatti</h1>
        </Col>
        <Col xs={12}>
          <Row className="d-flex align-items-stretch mt-5">
            <Col xs={12} lg={5} className="offset-lg-1 g-2 mb-5">
              <div id="HomePic">
                <Image src={image0} className="w-100 rounded-3" />
                <Link to="/prenota"></Link>
                <Card
                  id="ContactCard"
                  border="black"
                  style={{ width: "18rem" }}
                  className="position-absolute"
                >
                  <Card.Header className="text-center">Chiamaci</Card.Header>
                  <Card.Body className="border-bottom">
                    <Card.Text>
                      <a href="tel:+393519440379" className="text-black">
                        <p className="my-1 text-center">+39 351 9440379</p>
                      </a>
                      <a href="tel:+3907015254471" className="text-black">
                        <p className="my-1 text-center">+39 070 15254471</p>
                      </a>
                    </Card.Text>
                  </Card.Body>
                  <Card.Header className="text-center">
                    Vienici a trovare
                  </Card.Header>
                  <Card.Body className="border-bottom">
                    <Card.Text className="text-center">
                      Via S.Lucifero, 47 <br />
                      09125 Cagliari(CA)
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="mt-2 text-center">
                  <Card.Body className="d-flex justify-content-around">
                    <span className=" h5 mt-1">Seguici su:</span>{" "}
                    <span className="me-5">
                      <a
                        href="https://www.instagram.com/haniel.hairstylist?igsh=am1ueGN3cDRqNHh1"
                        className="me-5 h4"
                      >
                        <Instagram />
                      </a>{" "}
                      <a
                        href="https://www.facebook.com/share/168BTqNy9Q/?mibextid=wwXIfr"
                        className="ms-2 me-5 h4"
                      >
                        <Facebook />
                      </a>
                    </span>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col
              xs={10}
              lg={5}
              className="ms-md-5 ms-lg-0 offset-lg-0 d-flex flex-column mb-5"
            >
              <div className="flex-grow-1 w-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.839123456789!2d9.123456789!3d39.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x123456789abcdef!2sVia%20S.%20Lucifero,%2047,%2009125%20Cagliari%20(CA)!5e0!3m2!1sit!2sit!4v1234567890123"
                  allowFullScreen=""
                  loading="eager"
                  className="w-100 h-100 rounded-3 ms-4"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </HMax>
  );
}
export default HContactS;
