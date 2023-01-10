import React, { useState, useEffect, useContext } from "react";
import { addTaggedList } from "../database/indexedDB";
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
      addTaggedList("01", {
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
      addTaggedList("01", { assetID: assetID, tagID: tagID });
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
    <Card className="border-0 shadow-none rounded-0" style={{ width: "350px" }}>
      <Card.Body>
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
            placeholder={"999 87456317"}
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
