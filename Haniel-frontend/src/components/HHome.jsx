import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, Image } from "react-bootstrap";
import HMax from "./HMax";
import image1 from "../assets/pic/image15.jpeg";

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
          <img src="/Capstone/HanielLogo.svg" alt="logo" className="w-100" />
        </Col>
        <Col xs={10} lg={6} className="offset-2 offset-lg-1 mt-5">
          <div id="HomePic">
            <Image src={image1} className="w-75 mt-5 rounded-2" />
            <Link to={isAuthenticated ? "/prenota" : "/login"}>
              <Button id="PrenotaButton" className="py-3 px-3 rounded-pill">
                Prenota ora!
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </HMax>
  );
}

export default HHome;
