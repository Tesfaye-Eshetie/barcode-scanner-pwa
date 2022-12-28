import ScannerContainer from "./components/ScannerContainer";
import { ShowScannerProvider } from "./contexts/ShowScannerContext";
import { BarcodeProvider } from "./contexts/BarcodeContext";
import "./App.css";

function App() {
  return (
    <ShowScannerProvider>
      <BarcodeProvider>
        <ScannerContainer />
      </BarcodeProvider>
    </ShowScannerProvider>
  );
}

export default App;
