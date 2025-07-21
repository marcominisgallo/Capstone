import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, Image } from "react-bootstrap";
import HMax from "./HMax";
import image1 from "../assets/pic/image15.jpeg";
import image2 from "../assets/pic/image2.jpeg";
import image3 from "../assets/pic/image3.jpeg";
import image4 from "../assets/pic/image4.jpeg";
import image5 from "../assets/pic/image5.jpeg";
import image6 from "../assets/pic/image6.jpeg";
import image7 from "../assets/pic/image7.jpeg";
import image8 from "../assets/pic/image8.jpeg";
import image9 from "../assets/pic/image9.jpeg";
import image10 from "../assets/pic/image10.jpeg";
import image11 from "../assets/pic/image11.jpeg";
import image12 from "../assets/pic/image12.jpeg";
import image13 from "../assets/pic/image13.jpeg";
import image14 from "../assets/pic/image14.jpeg";

function HHome() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <HMax>
      <Row className="mb-5 mb-lg-3 ">
        <Col
          xs={8}
          md={6}
          lg={3}
          className="offset-2 offset-md-3 offset-lg-2 d-none d-lg-block"
        >
          <img src={`HanielLogo.svg`} alt="logo" className="w-100" />
        </Col>
        <Col xs={10} lg={6} className="offset-2 offset-lg-1">
          <Row>
            <Col xs={12}>
              <div id="HomePic">
                <Image src={image1} className="w-75 mt-5 rounded-2 ms-2" />
              </div>
            </Col>
            <Col xs={9} className="text-center mt-2 ms-2">
              <Link to={isAuthenticated ? "/prenota" : "/login"}>
                <Button id="PrenotaButton" className="py-3 px-3 rounded-pill">
                  Prenota ora!
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Galleria fotografica */}
      <Row className="mt-3 mb-5">
        <h2 className="text-center mb-4">I nostri lavori</h2>
        <Col xs={12} className="d-flex flex-wrap justify-content-center">
          {[
            image2,
            image10,
            image11,
            image12,
            image13,
            image14,
            image3,
            image4,
            image5,
            image6,
            image7,
            image8,
          ].map((image, index) => (
            <div key={index} className="col-2 p-2">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="rounded-2 w-100"
                style={{
                  height: "200px", // Dimensione uniforme
                  objectFit: "cover", // Adatta l'immagine senza distorsioni
                }}
              />
            </div>
          ))}
        </Col>
      </Row>
    </HMax>
  );
}

export default HHome;
