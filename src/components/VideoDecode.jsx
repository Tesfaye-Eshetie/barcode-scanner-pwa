import React, { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { BarcodeReader, BarcodeScanner } from "dynamsoft-javascript-barcode";
import {
  CaretLeft,
  FileImage,
  Flashlight,
  Gear,
  VideoCamera,
} from "phosphor-react";

import SettingPopup from "./SettingPopup";

import "./VideoDecode.css";

const defaultSettingsValues = {
  isTorchSupported: "",
  autoFocus: true,
  autoZoom: false,
  zoomFactor: 1,
  vibrate: "unique",
  sound: "unique",
  scanMode: "balance",
  grayscaleTransformationModes: [2, 0, 0, 0, 0, 0, 0, 0],
  resolutionCapability: {
    maxHeight: 0,
    maxWidth: 0,
  },
};
const getSettingValues = () => {
  const SettingValues = localStorage.getItem(`settingValues`);
  return SettingValues ? JSON.parse(SettingValues) : defaultSettingsValues;
};

export default function VideoDecode({ barcode, setBarcode }) {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isTakePicture, setIsTakePicture] = useState(false);
  const [displaySettingPopup, setDisplaySettingPopup] = useState(false);

  const [cameraSettingValues, setCameraSettingValues] = useState(
    getSettingValues()
  );
  const {
    isTorchSupported,
    autoFocus,
    autoZoom,
    zoomFactor,
    grayscaleTransformationModes,
    scanMode,
    sound,
    vibrate,
    resolutionCapability,
  } = cameraSettingValues;
  const { maxHeight, maxWidth } = resolutionCapability;
  const firstGrayscaleTransformationMode = grayscaleTransformationModes[0];
  const [settingValues, setSettingValues] = useState({
    autoFocus,
    autoZoom,
    vibrate,
    sound,
    scanMode,
    grayscaleTransformationModes,
  });

  const handleSliderChange = (value) => {
    setCameraSettingValues((prev) => ({
      ...prev,
      zoomFactor: value,
    }));
    localStorage.setItem(
      `settingValues`,
      JSON.stringify({
        ...cameraSettingValues,
        zoomFactor: value,
      })
    );
  };

  const handleCameraSettingChange = () => {
    setCameraSettingValues((prev) => ({
      ...prev,
      ...settingValues,
    }));
    const updatedValues = {
      ...cameraSettingValues,
      ...settingValues,
    };
    localStorage.setItem(`settingValues`, JSON.stringify(updatedValues));
    setDisplaySettingPopup(false);
  };

  const elRef = useRef();
  const pScanner = useRef(null);

  const readBarcode = async () => {
    try {
      const scanner = await (pScanner.current =
        BarcodeScanner.createInstance());
      // Should judge if scanner is destroyed after 'await' in React 18 'StrictMode'.
      if (scanner.isContextDestroyed()) return;

      if (!elRef.current) throw Error("elRef is not assigned");
      await scanner.setUIElement(elRef.current);
      // Should judge if scanner is destroyed after 'await' in React 18 'StrictMode'.
      if (scanner.isContextDestroyed()) return;

      scanner.onFrameRead = (results) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const result of results) {
          setBarcode({
            keyDownValue: "",
            focusNextInput: false,
            inputValue: result.barcodeText,
            barcodeValue: result.barcodeText,
            showScanner: false,
          });
        }
      };
      if (isTakePicture) {
        scanner.close();
        scanner.singleFrameMode = true;
        await scanner.show();
      } else {
        try {
          const { OS, browser } = await BarcodeReader.detectEnvironment();
          const isSupportedBrowser =
            (OS === "Windows" &&
              (browser === "Chrome" || browser === "Edge")) ||
            (OS === "Android" && (browser === "Chrome" || browser === "Edge"));
          setCameraSettingValues((prev) => ({
            ...prev,
            isTorchSupported: `${isSupportedBrowser}`,
          }));
          localStorage.setItem(
            `settingValues`,
            JSON.stringify({
              ...cameraSettingValues,
              isTorchSupported: `${isSupportedBrowser}`,
            })
          );

          // Set runtime settings
          const runtimeSettings = await scanner?.getRuntimeSettings();
          runtimeSettings.region = {
            regionMeasuredByPercentage: 1,
            regionLeft: 20,
            regionTop: 38,
            regionRight: 80,
            regionBottom: 62,
          };
          runtimeSettings.furtherModes.grayscaleTransformationModes =
            grayscaleTransformationModes;

          // Set scan settings
          const scanSettings = await scanner.getScanSettings();
          scanSettings.intervalTime = 100;
          scanSettings.autoFocus = autoFocus;
          scanSettings.autoZoom = autoZoom;
          scanSettings.autoSuggestTip = true;
          scanSettings.whenToVibrateforSuccessfulRead = vibrate;
          scanSettings.whenToPlaySoundforSuccessfulRead = sound;
          scanSettings.duplicateForgetTime = 3000;

          if (maxHeight && maxWidth) {
            await scanner.setResolution(maxWidth, maxHeight);
          }

          scanner.ifSaveLastUsedCamera = true;
          await scanner.updateRuntimeSettings(scanMode);
          await scanner.updateRuntimeSettings(runtimeSettings);
          await scanner.updateScanSettings(scanSettings);
          await scanner.open();

          if (!maxHeight || !maxWidth) {
            const capabilities = scanner.getCapabilities();

            const newMaxHeight = capabilities?.height?.max;
            const newMaxWidth = capabilities?.width?.max;
            if (newMaxHeight && newMaxWidth) {
              await scanner.setResolution(newMaxWidth, newMaxHeight);

              setCameraSettingValues((prev) => ({
                ...prev,
                resolutionCapability: {
                  maxHeight: newMaxHeight,
                  maxWidth: newMaxWidth,
                },
              }));

              localStorage.setItem(
                `settingValues`,
                JSON.stringify({
                  ...cameraSettingValues,
                  resolutionCapability: {
                    maxHeight: newMaxHeight,
                    maxWidth: newMaxWidth,
                  },
                })
              );
            }
          }

          await scanner.setZoom(zoomFactor);
          if (browser === "Chrome" || browser === "Edge") {
            await scanner.enableTapToFocus();
          }
          if (isTorchSupported === "true") {
            if (isTorchOn) {
              await scanner.turnOnTorch();
            } else {
              await scanner.turnOffTorch();
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    readBarcode();

    return () => {
      (async () => {
        if (pScanner.current) {
          (await pScanner.current).destroyContext();
        }
      })();
    };
  }, [
    isTorchOn,
    isTakePicture,
    autoFocus,
    autoZoom,
    zoomFactor,
    scanMode,
    sound,
    vibrate,
    maxHeight,
    maxWidth,
    firstGrayscaleTransformationMode,
  ]);

  return barcode.showScanner ? (
    <div
      ref={elRef}
      role="button"
      aria-hidden="true"
      className="video-container d-flex flex-column justify-content-center align-items-center"
      onClick={handleCameraSettingChange}
    >
      {displaySettingPopup ? (
        <SettingPopup
          settingValues={settingValues}
          setSettingValues={setSettingValues}
        />
      ) : null}
      <div className="div-ui-container">
        <svg className="dce-bg-loading" viewBox="0 0 1792 1792">
          <path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z" />
        </svg>
        <div className="video-navbar d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <button
              type="button"
              aria-label="navigate-back"
              onClick={() =>
                setBarcode({
                  barcodeValue: "",
                  showScanner: false,
                })
              }
              data-testid="back-btn"
              className="back-btn d-flex justify-content-center align-items-center mx-2"
            >
              <CaretLeft size={28} color="#0a1c59" weight="bold" />
              <span>Back</span>{" "}
            </button>
            <button
              type="button"
              onClick={() => setIsTakePicture(!isTakePicture)}
              data-testid="take-picture-btn"
              id="btn-single-frame-mode"
              className="video-btn d-flex justify-content-center align-items-center"
            >
              {isTakePicture ? (
                <VideoCamera size={28} weight="bold" />
              ) : (
                <FileImage size={28} weight="bold" />
              )}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setDisplaySettingPopup(true);
              }}
              onMouseEnter={(event) => {
                event.stopPropagation();
                setDisplaySettingPopup(true);
              }}
              onTouchStart={(event) => {
                event.stopPropagation();
                setDisplaySettingPopup(true);
              }}
              data-testid="scan-setting-btn"
              className="video-btn d-flex justify-content-center align-items-center"
            >
              <Gear size={28} weight="bold" />
            </button>
            {isTorchSupported === "true" ? (
              <button
                type="button"
                aria-label="turn on or off torch"
                onClick={() => setIsTorchOn(!isTorchOn)}
                data-testid="torch-btn"
                id="btn-torch"
                className="video-btn d-flex justify-content-center align-items-center"
              >
                <Flashlight size={28} weight="bold" />
              </button>
            ) : null}
          </div>
          <div className="div-select-container d-flex flex-column align-items-end">
            <select className="dce-sel-camera" />
            <select className="dce-sel-resolution">
              <option className="dce-opt-gotResolution" value="got" />
              {maxWidth &&
              maxHeight &&
              maxHeight !== 1080 &&
              maxHeight !== 720 &&
              maxHeight !== 480 ? (
                <option data-width={`${maxWidth}`} data-height={`${maxHeight}`}>
                  {maxWidth}x{maxHeight}
                </option>
              ) : null}
              <option data-width="1920" data-height="1080">
                1920x1080
              </option>
              <option data-width="1280" data-height="720">
                1280x720
              </option>
              <option data-width="640" data-height="480">
                640x480
              </option>
            </select>
          </div>{" "}
          {!autoZoom || isTakePicture ? (
            <div className="zoom-slider-wrapper d-flex justify-content-center align-items-center">
              <div className="zoom-slider d-flex justify-content-center align-items-center">
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={zoomFactor}
                  className="slider"
                  onChange={handleSliderChange}
                  trackStyle={{ height: 8, marginLeft: -2, marginBottom: 2 }}
                  handleStyle={{
                    height: 48,
                    width: 48,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="dce-video-container" />
      </div>
    </div>
  ) : null;
}
