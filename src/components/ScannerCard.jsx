import React, { useState, useEffect, useContext } from "react";
import { addBarcode } from "../database/indexedDB";
import { BarcodeContext } from "../contexts/BarcodeContext";
import { ShowScannerContext } from "../contexts/ShowScannerContext";
import ScannerForm from "./ScannerForm";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function ScannerCard() {
  const [disableButton, setDisableButton] = useState(true);
  const { roomID, assetID, tagID, setRoomID, setAssetID, setTagID } =
    useContext(BarcodeContext);
  const {
    showRoomID,
    showAssetID,
    showTagID,
    setShowRoomID,
    setShowAssetID,
    setShowTagID,
  } = useContext(ShowScannerContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (roomID && assetID && tagID) {
      addBarcode(assetID, {
        roomID: roomID,
        assetID: assetID,
        tagID: tagID,
      });
      setShowRoomID(false);
      setShowAssetID(false);
      setShowTagID(false);
      setRoomID("");
      setAssetID("");
      setTagID("");
    } else {
      addBarcode(assetID, { assetID: assetID, tagID: tagID });
      setShowRoomID(false);
      setShowAssetID(false);
      setShowTagID(false);
      setRoomID("");
      setAssetID("");
      setTagID("");
    }
  };

  useEffect(() => {
    if (assetID && tagID) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [assetID, tagID]);

  return (
    <Card>
      <Card.Title className="text-capitalize pb-3 fw-bolder text-center mt-4">
        Dynamsoft Scanner
      </Card.Title>
      <Card.Body className="p-4">
        <Form action="/" noValidate onSubmit={handleSubmit}>
          <ScannerForm
            barcode={roomID}
            setBarcode={setRoomID}
            showScanner={showRoomID}
            setShowScanner={setShowRoomID}
            ID={"Room-ID"}
            placeholder={"4302 (Option)"}
          />
          <ScannerForm
            barcode={assetID}
            setBarcode={setAssetID}
            showScanner={showAssetID}
            setShowScanner={setShowAssetID}
            ID={"Asset-ID"}
            placeholder={"999 87456317AD"}
          />
          <ScannerForm
            barcode={tagID}
            setBarcode={setTagID}
            showScanner={showTagID}
            setShowScanner={setShowTagID}
            ID={"Tag-ID"}
            placeholder={"999 87456317AD"}
          />
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
