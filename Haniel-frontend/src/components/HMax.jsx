import { Container } from "react-bootstrap";

function HMax({ children }) {
  return (
    <Container fluid className="h-100">
      {children}
    </Container>
  );
}
export default HMax;
