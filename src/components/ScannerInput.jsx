import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CameraIcon from "/images/camera.png";

export default function DisplayCamera({
  barcode,
  setBarcode,
  setShowScanner,
  ID,
  placeholder,
}) {
  const handleChange = (event) => {
    setBarcode(event.target.value);
  };

  const scanBarcode = () => {
    setTimeout(() => setShowScanner(true), 1000);
  };
  const removeTag = () => {
    setBarcode("");
    setShowScanner(false);
  };

  return (
    <Form.Group>
      <Form.Label>{ID}</Form.Label>
      <div className="d-flex gap-2 justify-content-center align-items-center my-1">
        <Form.Control
          className="d-flex justify-content-center align-items-center p-2"
          type="text"
          value={barcode}
          onChange={handleChange}
          placeholder={placeholder}
          required
        />
        {barcode ? (
          <Button
            onClick={removeTag}
            variant="danger"
            className="d-flex justify-content-center align-items-center px-3 py-2"
          >
            <span>X</span>
          </Button>
        ) : (
          <Button
            onClick={scanBarcode}
            className="d-flex justify-content-center align-items-center"
          >
            {" "}
            <img
              alt="logo"
              src={CameraIcon}
              width="20"
              height="20"
              className="m-1"
            />
          </Button>
        )}
      </div>
    </Form.Group>
  );
}
