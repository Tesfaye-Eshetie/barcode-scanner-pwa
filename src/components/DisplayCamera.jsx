import React, { useState, useEffect } from "react";
import { addBarcode } from "../database/indexedDB";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Camera from "/images/camera.png";

export default function DisplayCamera({ barcode, setBarcode, setShowScanner }) {
  const [disableButton, setDisableButton] = useState(true);

  const handleChange = (event) => {
    setBarcode(event.target.value);
  };

  const scanBarcode = () => {
    setShowScanner(true);
    if (typeof Event === "function") {
      // modern browsers
      window.dispatchEvent(new Event("resize"));
    } else {
      // for IE and other old browsers
      // causes deprecation warning on modern browsers
      var evt = window.document.createEvent("UIEvents");
      evt.initUIEvent("resize", true, false, window, 0);
      window.dispatchEvent(evt);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (barcode) {
      addBarcode(barcode, barcode);
      setShowScanner(false);
      setBarcode("");
    }
  };

  useEffect(() => {
    if (barcode) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [barcode]);

  return (
    <Card>
      <Card.Title className="text-capitalize pb-3 fw-bolder text-center mt-4">
        Dynamsoft Scanner
      </Card.Title>
      <Card.Body className="p-4">
        <Form action="/" noValidate onSubmit={handleSubmit}>
          <Form.Group className="d-flex gap-2 justify-content-center align-items-center p">
            <Form.Control
              className="d-flex justify-content-center align-items-center p-2"
              type="text"
              value={barcode}
              onChange={handleChange}
              placeholder="999 87456317AD"
              required
            />
            <Button onClick={scanBarcode}>
              {" "}
              <img
                alt="logo"
                src={Camera}
                width="20"
                height="20"
                className="d-flex justify-content-center align-items-center m-1"
              />
            </Button>
          </Form.Group>
          <Button
            type="submit"
            disabled={disableButton && true}
            className="mt-3 p-2"
            style={{ width: "100%" }}
          >
            Tag Asset
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
