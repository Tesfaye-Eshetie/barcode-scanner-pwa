import React, { useState, useEffect } from "react";
import ScannerContainer from "./components/ScannerContainer";
import { ShowScannerContext } from "./contexts/ScannerContext";
import { BarcodeContext } from "./contexts/ScannerContext";
import "./App.css";

function App() {
  const [roomID, setRoomID] = useState("");
  const [assetID, setAssetID] = useState("");
  const [tagID, setTagID] = useState("");

  const [showRoomID, setShowRoomID] = useState(false);
  const [showAssetID, setShowAssetID] = useState(false);
  const [showTagID, setShowTagID] = useState(false);

  // const [showScanner, setShowScanner] = useState({
  //   showRoomID: false,
  //   showAssetId: false,
  //   showTagID: false
  // });
  const barcode = [roomID, setRoomID, assetID, setAssetID, tagID, setTagID];
  const showScanner = [
    showRoomID,
    setShowRoomID,
    showAssetID,
    setShowAssetID,
    showTagID,
    setShowTagID,
  ];

  return (
    <ShowScannerContext.Provider value={showScanner}>
      <BarcodeContext.Provider value={barcode}>
        <ScannerContainer />
      </BarcodeContext.Provider>
    </ShowScannerContext.Provider>
  );
}

export default App;
