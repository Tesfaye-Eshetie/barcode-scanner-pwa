import { useEffect, useContext } from "react";
import "../dbr";
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import { NetworkStatusContext } from "../contexts/NetworkStatusContext";
import VideoDecode from "./VideoDecode";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CameraIcon from "/images/camera.png";

export default function ScannerForm({ barcode, setBarcode, ID, placeholder }) {
  const isNetworkOnline = useContext(NetworkStatusContext);

  const handleChange = (event) => {
    setBarcode(event.target.value);
  };

  const scanBarcode = () => {
    setBarcode({
      barcodeValue: "",
      showScanner: true,
    });
  };

  const removeTag = () => {
    setBarcode({
      barcodeValue: "",
      showScanner: false,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        await BarcodeReader.loadWasm();
      } catch (ex) {
        let errMsg;
        if (ex.message.includes("network connection error")) {
          errMsg =
            "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        } else {
          errMsg = ex.message || ex;
        }
        console.error(errMsg);
        alert(errMsg);
      }
    })();
  }, []);

  return (
    <>
      <Form.Group>
        <Form.Label
          style={{ fontWeight: "600", fontSize: "14px", lineHeight: "21px" }}
        >
          {ID}
        </Form.Label>
        <div className="d-flex gap-2 justify-content-center align-items-center my-1">
          <Form.Control
            className="d-flex justify-content-center align-items-center p-2"
            type="text"
            value={barcode.barcodeValue}
            onChange={handleChange}
            placeholder={placeholder}
            required
          />
          {barcode.barcodeValue ? (
            <Button
              onClick={removeTag}
              variant="danger"
              className="d-flex justify-content-center align-items-center px-3 py-2"
            >
              <span>X</span>
            </Button>
          ) : (
            <Button
              disabled={!isNetworkOnline}
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
      {barcode.showScanner ? (
        <VideoDecode barcode={barcode} setBarcode={setBarcode} />
      ) : null}
    </>
  );
}
