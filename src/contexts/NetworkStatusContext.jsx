import React, { createContext, useMemo, useState, useEffect } from "react";

const initialState = !!navigator.onLine;

export const NetworkStatusContext = createContext(initialState);
export function NetworkStatusProvider({ children }) {
  const [isNetworkOnline, setIsNetworkOnline] = useState(initialState);

  // This fetches your website's favicon
  // Notice the appended date param which helps prevent browser caching.
  const checkOnlineStatus = async () => {
    try {
      const response = await fetch(`/barcode-scanner-pwa/favicon.ico?d=${Date.now()}`);
      if (!response.ok) throw new Error("Network response was not ok");
      // At this point we can safely assume the user has connection to the internet
      console.log("Internet connection available");
      setIsNetworkOnline(true);
    } catch (error) {
      // The resource could not be reached
      setIsNetworkOnline(false);
      console.log("No Internet connection", error);
    }
  };

  useEffect(() => {
    // setIsNetworkOnline(navigator.onLine)
    setInterval(async () => {
      await checkOnlineStatus();
    }, 6000);
  }, []);

  //   window.addEventListener('offline', () => {
  //     console.log('Network connection lost.')
  //     setIsNetworkOnline(false)
  //   })

  //   window.addEventListener('online', () => {
  //     console.log('Network connectioned.')
  //     setIsNetworkOnline(true)
  //   })
  const NetworkStatusProviderValue = useMemo(
    () => isNetworkOnline,
    [isNetworkOnline]
  );
  return (
    <NetworkStatusContext.Provider value={NetworkStatusProviderValue}>
      {children}
    </NetworkStatusContext.Provider>
  );
}
