import { Container } from "react-bootstrap";
import { Clock, GeoAlt, Telephone } from "react-bootstrap-icons";

function HFooter() {
  return (
    <footer id="footer" className="d-flex justify-content-evenly">
      <Container className="text-center my-3">
        <h6 className="mb-4 fw-bold">
          <Clock />
          ORARIO
        </h6>
        <ul
          id="footer-hours"
          className="list-unstyled d-flex flex-column align-items-center"
        >
          <li className="w-50 d-flex justify-content-between mx-auto">
            Martedi - Venerdi: <span className="fw-bold">10-19</span>
          </li>
          <li className="w-50 d-flex justify-content-between mx-auto">
            Sabato: <span className="fw-bold">10-18</span>
          </li>
          <li className="w-50 d-flex justify-content-between mx-auto">
            Domenica - Lunedi: <span className="fw-bold">CHIUSO</span>
          </li>
        </ul>
      </Container>
      <Container className="text-center my-3">
        <h6 className="mb-4 fw-bold">
          <GeoAlt />
          DOVE SIAMO
        </h6>
        <a
          href="https://maps.app.goo.gl/ocK7C38a3kFWP86D7?g_st=ic"
          className="text-decoration-none text-black d-flex flex-column align-items-center"
        >
          <p className="my-1">Via S.Lucifero,47</p>
          <p className="my-1">09125</p>
          <p className="my-1">Cagliari (CA)</p>
        </a>
      </Container>
      <Container className="text-center my-3">
        <h6 className="mb-4 fw-bold">
          {" "}
          <Telephone />
          CONTATTI
        </h6>
        <div className=" d-flex flex-column align-items-center">
          <a
            href="tel:+393519440379"
            className="text-decoration-none text-black"
          >
            <p className="my-1">+39 351 9440379</p>
          </a>
          <a
            href="tel:+3907015254471"
            className="text-decoration-none text-black"
          >
            <p className="my-1">+39 070 15254471</p>
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default HFooter;
