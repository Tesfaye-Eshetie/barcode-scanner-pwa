import { createContext, useState } from "react";

export const BarcodeContext = createContext();

export const BarcodeProvider = ({ children }) => {
  const [roomID, setRoomID] = useState({
    barcodeValue: "",
    showScanner: false,
  });
  const [assetID, setAssetID] = useState({
    barcodeValue: "",
    showScanner: false,
  });
  const [tagID, setTagID] = useState({
    inputValue: "",
    barcodeValue: "",
  });

  const value = { roomID, assetID, tagID, setRoomID, setAssetID, setTagID };

  return (
    <BarcodeContext.Provider value={value}>{children}</BarcodeContext.Provider>
  );
};
