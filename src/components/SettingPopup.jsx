import React from "react";
import {
  Barcode,
  SelectionSlash,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
  Vibrate,
} from "phosphor-react";

export default function SettingPopup({ settingValues, setSettingValues }) {
  const handleSettingChange = (key, value) => {
    setSettingValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      role="button"
      aria-hidden="true"
      className="settings-container d-flex justify-content-start align-items-start"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="settings-card d-flex flex-column justify-content-center align-items-center">
        <div className="settings-title-wrapper d-flex justify-content-center align-items-center">
          <h1 className="settings-title d-flex justify-content-center align-items-center">
            Scan Settings
          </h1>
        </div>
        <div className="settings-content-wrapper d-flex flex-column justify-content-center gap-3">
          <p>Scan Mode</p>
          <div className="settings-mode-wrapper d-flex justify-content-between align-items-center gap-2">
            <button
              type="button"
              onClick={() => handleSettingChange("scanMode", "speed")}
              className={`settings-btn ${
                settingValues.scanMode === "speed"
                  ? "settings-yellow-btn"
                  : null
              }`}
            >
              Best Speed
            </button>
            <button
              type="button"
              onClick={() => handleSettingChange("scanMode", "balance")}
              className={`settings-btn ${
                settingValues.scanMode === "balance"
                  ? "settings-yellow-btn"
                  : null
              }`}
            >
              Balance
            </button>
            <button
              type="button"
              onClick={() => handleSettingChange("scanMode", "coverage")}
              className={`settings-btn ${
                settingValues?.scanMode === "coverage"
                  ? "settings-yellow-btn"
                  : null
              }`}
            >
              Best Coverage
            </button>
          </div>
        </div>
        <div className="settings-content-wrapper d-flex flex-column justify-content-center gap-3">
          <p>Barcode Color Option</p>
          <div className="settings-color-wrapper d-flex justify-content-between align-items-center gap-4">
            <button
              type="button"
              onClick={() =>
                handleSettingChange(
                  "grayscaleTransformationModes",
                  [2, 0, 0, 0, 0, 0, 0, 0]
                )
              }
              className={`color-option-btn d-flex align-items-center ${
                settingValues?.grayscaleTransformationModes[0] === 2
                  ? "settings-yellow-btn"
                  : null
              }`}
            >
              <p className="color-option-text d-flex justify-content-center align-items-center">
                Normal
              </p>
              <Barcode weight="thin" className="normal-barcode" />
            </button>
            <button
              type="button"
              onClick={() =>
                handleSettingChange(
                  "grayscaleTransformationModes",
                  [1, 0, 0, 0, 0, 0, 0, 0]
                )
              }
              className={`color-option-btn d-flex align-items-center ${
                settingValues?.grayscaleTransformationModes[0] === 1
                  ? "settings-yellow-btn"
                  : null
              }`}
            >
              <p className="color-option-text d-flex justify-content-center align-items-center">
                Inverted
              </p>
              <Barcode weight="fill" className="inverted-barcode" />
            </button>
          </div>
        </div>
        <div className="settings-content-wrapper d-flex justify-content-between align-items-center">
          <p>Vibrate on Scan</p>
          <button
            type="button"
            onClick={() => {
              const vibrateValue =
                settingValues?.vibrate === "unique" ? "never" : "unique";
              handleSettingChange("vibrate", vibrateValue);
            }}
            className="vibrate"
          >
            {settingValues?.vibrate === "unique" ? (
              <Vibrate size={36} className="vibration-on" />
            ) : (
              <SelectionSlash size={36} className="vibration-off" />
            )}
          </button>
        </div>
        <div className="settings-content-wrapper d-flex justify-content-between align-items-center">
          <p>Sound on Scan</p>
          <button
            type="button"
            onClick={() => {
              const soundValue =
                settingValues?.sound === "unique" ? "never" : "unique";
              handleSettingChange("sound", soundValue);
            }}
            className="scan-sound"
          >
            {settingValues?.sound === "unique" ? (
              <SpeakerSimpleHigh
                size={36}
                weight="bold"
                className="scan-sound-on"
              />
            ) : (
              <SpeakerSimpleSlash
                size={36}
                weight="bold"
                className="scan-sound-off"
              />
            )}
          </button>
        </div>
        <div className="focus-zoom-wrapper d-flex flex-column justify-content-between align-items-center">
          <div className="focus-wrapper d-flex justify-content-between align-items-center">
            <p>Auto Focus</p>
            <button
              type="button"
              onClick={() =>
                handleSettingChange("autoFocus", !settingValues?.autoFocus)
              }
              className={`off-on-animation ${
                settingValues?.autoFocus ? "auto-on" : "auto-off"
              }`}
            >
              <span />
            </button>
          </div>
          <div className="zoom-wrapper d-flex justify-content-between align-items-center">
            <p>Auto Zoom</p>
            <button
              type="button"
              onClick={() =>
                handleSettingChange("autoZoom", !settingValues?.autoZoom)
              }
              className={`off-on-animation ${
                settingValues?.autoZoom ? "auto-on" : "auto-off"
              }`}
            >
              <span />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
