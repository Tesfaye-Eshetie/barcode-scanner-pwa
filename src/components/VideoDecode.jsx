import React, { useEffect, useRef } from "react";
import { BarcodeScanner } from "dynamsoft-javascript-barcode";

import "./VideoDecode.css";

class VideoDecode extends React.Component {
  constructor(props) {
    super(props);
    this.pScanner = null;
    this.elRef = React.createRef();
  }
  async componentDidMount() {
    try {
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      // Should judge if scanner is destroyed after 'await' in React 18 'StrictMode'.
      if (scanner.isContextDestroyed()) return;
      await scanner.setUIElement(this.elRef.current);
      // Should judge if scanner is destroyed after 'await' in React 18 'StrictMode'.
      if (scanner.isContextDestroyed()) return;
      scanner.onFrameRead = (results) => {
        for (let result of results) {
          console.log(result.barcodeText);
          this.props.setBarcode(result.barcodeText);
          this.props.setShowScanner(false);
        }
      };
      await scanner.open();
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
  }
  async componentWillUnmount() {
    if (this.pScanner) {
      (await this.pScanner).destroyContext();
      console.log("BarcodeScanner Component Unmount");
    }
  }
  shouldComponentUpdate() {
    // Never update UI after mount, dbrjs sdk use native way to bind event, update will remove it.
    return false;
  }

  render() {
    return (
      <div ref={this.elRef} className="video-container">
        <div className="div-ui-container">
          <svg className="dce-bg-loading" viewBox="0 0 1792 1792">
            <path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"></path>
          </svg>
          <div className="dce-video-container">
            <div className="div-ui-container-center"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoDecode;
// export default function VideoDecode({ setBarcode, setShowScanner }) {
//   const elRef = useRef();

//   useEffect(() => {
//     (async () => {
//       try {
//         const scanner = await BarcodeScanner.createInstance();
//         await scanner.setUIElement(elRef.current);
//         scanner.onFrameRead = (results) => {
//           for (let result of results) {
//             console.log(result);
//             setBarcode(result.barcodeText);
//             setShowScanner(false);
//           }
//         };
//         await scanner.open();
//       } catch (ex) {
//         let errMsg;
//         if (ex.message.includes("network connection error")) {
//           errMsg =
//             "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
//         } else {
//           errMsg = ex.message || ex;
//         }
//         alert(errMsg);
//       }
//     })();
//   }, []);

//   return (
//     <div ref={elRef} className="video-container">
//       <div className="div-ui-container">
//         <svg className="dce-bg-loading" viewBox="0 0 1792 1792">
//           <path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"></path>
//         </svg>
//         <div className="dce-video-container">
//           <div className="div-ui-container-center"></div>
//         </div>
//       </div>
//     </div>
//   );
// }
