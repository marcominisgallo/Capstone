import { Container } from "react-bootstrap";

function HMax({ children }) {
  return (
    <Container
      id="max"
      fluid
      className=" border-bottom border-2 border-black mb-4"
    >
      {children}
    </Container>
  );
}
export default HMax;
