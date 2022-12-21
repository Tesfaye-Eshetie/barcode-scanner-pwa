import React, { useState, useEffect } from "react";
import "../../src/dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import VideoDecode from "../../src/components/VideoDecode";
import DisplayCamera from "./DisplayCamera";

import Container from "react-bootstrap/Container";

export default function ReadBarcod() {
  const [barcode, setBarcode] = useState({
    roomID: "",
    assetID: "",
    tagID: "",
  });
  const [showScanner, setShowScanner] = useState(false);

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

  if (!barcode.roomID && showScanner) {
    return (
      <VideoDecode
        setBarcode={setBarcode}
        barcode={barcode}
        nameID={barcode.roomID}
      />
    );
  } else {
    return (
      <Container
        style={{ width: "360px", height: "844px" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <DisplayCamera
          barcode={barcode}
          setBarcode={setBarcode}
          setShowScanner={setShowScanner}
        />
      </Container>
    );
  }
}
