import React, { useState, useEffect, useRef } from "react";
import { BarcodeScanner } from "dynamsoft-javascript-barcode";

import "./VideoDecode.css";

export default function VideoDecode({ setBarcode }) {
  const [] = useState();
  const elRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const scanner = await BarcodeScanner.createInstance();
        await scanner.setUIElement(elRef.current);
        scanner.onFrameRead = (results) => {
          for (let result of results) {
            setBarcode(result.barcodeText);
            console.log(result.barcodeText);
          }
        };
        scanner.onUniqueRead = (txt) => {
          alert(txt);
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
    })();
  }, []);

  return (
    <div ref={elRef} className="barcode-scanner">
      <svg className="dce-bg-loading" viewBox="0 0 1792 1792">
        <path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"></path>
      </svg>
      <div className="dce-video-container">
        <div className="dce-video-container-center"></div>
      </div>
    </div>
  );
}
