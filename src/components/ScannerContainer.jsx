import ScannerCard from "./ScannerCard";
import Container from "react-bootstrap/Container";

export default function ScannerContainer() {
  return (
    <Container
      style={{ width: "390px", height: "844px" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <ScannerCard />
    </Container>
  );
}
