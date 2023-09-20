import ScannerContainer from "./components/ScannerContainer";
import { BarcodeProvider } from "./contexts/BarcodeContext";
import "./App.css";
import { NetworkStatusProvider } from "./contexts/NetworkStatusContext";

function App() {
  return (
    <NetworkStatusProvider>
      <BarcodeProvider>
        <ScannerContainer />
      </BarcodeProvider>
    </NetworkStatusProvider>
  );
}

export default App;
