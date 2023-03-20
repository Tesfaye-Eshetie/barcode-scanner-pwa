import ScannerContainer from "./components/ScannerContainer";
import { ShowScannerProvider } from "./contexts/ShowScannerContext";
import { BarcodeProvider } from "./contexts/BarcodeContext";
import "./App.css";
import { NetworkStatusProvider } from "./contexts/NetworkStatusContext";

function App() {
  return (
    <NetworkStatusProvider>
      <ShowScannerProvider>
        <BarcodeProvider>
          <ScannerContainer />
        </BarcodeProvider>
      </ShowScannerProvider>
    </NetworkStatusProvider>
  );
}

export default App;
