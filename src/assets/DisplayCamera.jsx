import React, { useState, useEffect } from "react";
import { addBarcode } from "../../src/database/indexedDB";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import CameraIcon from "/images/camera.png";

export default function DisplayCamera({ barcode, setBarcode, setShowScanner }) {
  const [disableButton, setDisableButton] = useState(true);

  const scanBarcode = () => {
    setShowScanner(true);
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

  const { roomID, assetID, tagID } = barcode;

  return (
    <Card>
      <Card.Title className="text-capitalize pb-3 fw-bolder text-center mt-4">
        Dynamsoft Scanner
      </Card.Title>
      <Card.Body className="p-4">
        <Form action="/" noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Room-ID</Form.Label>
            <div className="d-flex gap-2 justify-content-center align-items-center my-1">
              <Form.Control
                className="d-flex justify-content-center align-items-center p-2"
                type="text"
                value={roomID}
                onChange={(event) =>
                  setBarcode({ ...barcode, roomID: event.target.value })
                }
                placeholder="4302 (Optional)"
                required
              />
              {roomID ? (
                <Button
                  onClick={() => setBarcode({ ...barcode, roomID: "" })}
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
          <Form.Group>
            <Form.Label>Asset-ID</Form.Label>
            <div className="d-flex gap-2 justify-content-center align-items-center my-1">
              <Form.Control
                className="d-flex justify-content-center align-items-center p-2"
                type="text"
                value={assetID}
                onChange={(event) =>
                  setBarcode({ ...barcode, assetID: event.target.value })
                }
                placeholder="999 87456317AD"
                required
              />
              {assetID ? (
                <Button
                  onClick={() => setBarcode({ ...barcode, assetID: "" })}
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
          <Form.Group>
            <Form.Label>Tag-ID</Form.Label>
            <div className="d-flex gap-2 justify-content-center align-items-center my-1">
              <Form.Control
                className="d-flex justify-content-center align-items-center p-2"
                type="text"
                value={tagID}
                onChange={(event) =>
                  setBarcode({ ...barcode, tagID: event.target.value })
                }
                placeholder="999 87456317AD"
                required
              />
              {tagID ? (
                <Button
                  onClick={() => setBarcode({ ...barcode, tagID: "" })}
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
