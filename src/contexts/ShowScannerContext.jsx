import { createContext, useState } from "react";

export const ShowScannerContext = createContext();

export const ShowScannerProvider = ({ children }) => {
  const [showRoomID, setShowRoomID] = useState(false);
  const [showAssetID, setShowAssetID] = useState(false);
  const [showTagID, setShowTagID] = useState(false);

  const value = {
    showRoomID,
    showAssetID,
    showTagID,
    setShowRoomID,
    setShowAssetID,
    setShowTagID,
  };

  return (
    <ShowScannerContext.Provider value={value}>
      {children}
    </ShowScannerContext.Provider>
  );
};
