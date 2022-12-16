import Container from "react-bootstrap/Container";
import ReadBarcod from "./components/ReadBarcod";
import "./App.css";

function App() {
  return (
    <Container
      style={{ width: "390px", height: "844px" }}
      className="d-flex justify-content-center align-items-center"
    >
      <ReadBarcod />
    </Container>
  );
}

export default App;
