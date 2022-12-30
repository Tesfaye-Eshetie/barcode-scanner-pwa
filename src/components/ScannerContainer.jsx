import ScannerCard from "./ScannerCard";
import Container from "react-bootstrap/Container";
import TaggedList from "./TaggedList";

export default function ScannerContainer() {
  return (
    <Container
      style={{ maxWidth: "390px", waxheight: "844px" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <TaggedList />
      <ScannerCard />
    </Container>
  );
}
