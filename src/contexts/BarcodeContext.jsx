import { createContext, useState } from "react";

export const BarcodeContext = createContext();

export const BarcodeProvider = ({ children }) => {
  const [roomID, setRoomID] = useState("");
  const [assetID, setAssetID] = useState("");
  const [tagID, setTagID] = useState("");

  const value = { roomID, assetID, tagID, setRoomID, setAssetID, setTagID };

  return (
    <BarcodeContext.Provider value={value}>{children}</BarcodeContext.Provider>
  );
};
