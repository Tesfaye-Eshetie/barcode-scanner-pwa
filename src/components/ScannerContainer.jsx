import { useContext, useEffect } from "react";
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import ScannerCard from "./ScannerCard";
import VideoDecode from "./VideoDecode";
import { BarcodeContext, ShowScannerContext } from "../contexts/ScannerContext";

import Container from "react-bootstrap/Container";

export default function ScannerContainer() {
  const barcode = useContext(BarcodeContext);
  const showScanner = useContext(ShowScannerContext);

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

  if (!barcode[0] && showScanner[0]) {
    return <VideoDecode setBarcode={barcode[1]} showScanner={showScanner[0]} />;
  } else if (!barcode[2] && showScanner[2]) {
    return <VideoDecode setBarcode={barcode[3]} showScanner={showScanner[2]} />;
  } else if (!barcode[4] && showScanner[4]) {
    return <VideoDecode setBarcode={barcode[5]} showScanner={showScanner[4]} />;
  } else {
    return (
      <Container
        style={{ width: "390px", height: "844px" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <ScannerCard />
      </Container>
    );
  }
}
