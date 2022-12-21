import React, { useState, useEffect, useContext } from "react";
import { addBarcode } from "../database/indexedDB";
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeContext, ShowScannerContext } from "../contexts/ScannerContext";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ScannerInput from "./ScannerInput";

export default function ReadBarcod() {
  const [disableButton, setDisableButton] = useState(true);
  const barcode = useContext(BarcodeContext);
  const showScanner = useContext(ShowScannerContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (barcode[2] || barcode[4])
      if (barcode[2] && barcode[2] && barcode[4]) {
        addBarcode(barcode[2], {
          roomID: barcode[0],
          assetID: barcode[2],
          tagID: barcode[4],
        });
        showScanner[1](false);
        showScanner[3](false);
        showScanner[5](false);
        barcode[1]("");
        barcode[3]("");
        barcode[5]("");
      } else {
        addBarcode(barcode[2], { assetID: barcode[2], tagID: barcode[4] });
        showScanner[1](false);
        showScanner[3](false);
        showScanner[5](false);
        barcode[1]("");
        barcode[3]("");
        barcode[5]("");
      }
  };

  useEffect(() => {
    if (barcode[2] && barcode[4]) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [barcode[2], barcode[4]]);

  return (
    <Card>
      <Card.Title className="text-capitalize pb-3 fw-bolder text-center mt-4">
        Dynamsoft Scanner
      </Card.Title>
      <Card.Body className="p-4">
        <Form action="/" noValidate onSubmit={handleSubmit}>
          <ScannerInput
            barcode={barcode[0]}
            setBarcode={barcode[1]}
            setShowScanner={showScanner[1]}
            ID={"Room-ID"}
            placeholder={"4302 (Option)"}
          />
          <ScannerInput
            barcode={barcode[2]}
            setBarcode={barcode[3]}
            setShowScanner={showScanner[3]}
            ID={"Asset-ID"}
            placeholder={"999 87456317AD"}
          />
          <ScannerInput
            barcode={barcode[4]}
            setBarcode={barcode[5]}
            setShowScanner={showScanner[5]}
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
