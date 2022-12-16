import React, { useState, useEffect } from "react";
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import VideoDecode from "./VideoDecode";
import DisplayCamera from "./DisplayCamera";

export default function ReadBarcod() {
  const [barcode, setBarcode] = useState("");
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

  if (!barcode && showScanner) {
    return <VideoDecode setBarcode={setBarcode} />;
  } else {
    return (
      <DisplayCamera
        barcode={barcode}
        setBarcode={setBarcode}
        setShowScanner={setShowScanner}
      />
    );
  }
}
