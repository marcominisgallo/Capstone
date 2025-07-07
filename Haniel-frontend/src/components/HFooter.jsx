import { Col, Container, Row } from "react-bootstrap";
import { Clock, GeoAlt, Telephone } from "react-bootstrap-icons";

function HFooter() {
  return (
    <Container fluid id="footer" className="pt-2 pb-4">
      <Row>
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={4}
          className="offset-sm-1 offset-md-2 offset-lg-1 my-3"
        >
          <Row>
            <Col xs={12} sm={10} md={9} lg={8}>
              <h6 className="mb-4 fw-bold text-center">
                <Clock />
                ORARIO
              </h6>
            </Col>
            <Col xs={8} sm={8} md={9} lg={8} className="offset-2 offset-md-0">
              <Row>
                <Col>
                  <p className="mb-0">Mar - Ven:</p>
                </Col>
                <Col>
                  <p className="fw-bold mb-0 text-end">10-19</p>
                </Col>
              </Row>
            </Col>
            <Col xs={8} sm={8} md={9} lg={8} className="offset-2 offset-md-0">
              <Row>
                <Col>
                  <p className="mb-0">Sabato:</p>
                </Col>
                <Col>
                  <p className="fw-bold mb-0 text-end">10-18</p>
                </Col>
              </Row>
            </Col>
            <Col xs={8} sm={8} md={9} lg={8} className="offset-2 offset-md-0">
              <Row>
                <Col>
                  <p className="mb-0">Dom -Lun:</p>
                </Col>
                <Col>
                  <p className="fw-bold mb-0 text-end">CHIUSO</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={3}
          className="offset-sm-1 offset-md-2 offset-lg-0 my-3"
        >
          <Row>
            <Col xs={12} sm={10} md={9} lg={8}>
              <h6 className="mb-4 fw-bold text-center">
                <GeoAlt />
                DOVE SIAMO
              </h6>
            </Col>
            <Col xs={12} sm={10} md={9} lg={8}>
              <a
                href="https://maps.app.goo.gl/ocK7C38a3kFWP86D7?g_st=ic"
                className="text-black d-flex flex-column align-items-center"
              >
                <p className="my-1">Via S.Lucifero,47</p>
                <p className="my-1">09125 Cagliari (CA)</p>
              </a>
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={3}
          className="offset-sm-1 offset-md-2 offset-lg-1 my-3"
        >
          <Row>
            <Col xs={12} sm={10} md={9} lg={8}>
              <h6 className="mb-4 fw-bold text-center">
                {" "}
                <Telephone />
                CONTATTI
              </h6>
            </Col>
            <Col xs={12} sm={10} md={9} lg={8}>
              <a href="tel:+393519440379" className="text-black">
                <p className="my-1 text-center">+39 351 9440379</p>
              </a>
            </Col>
            <Col xs={12} sm={10} md={9} lg={8}>
              <a href="tel:+3907015254471" className="text-black">
                <p className="my-1 text-center">+39 070 15254471</p>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HFooter;
