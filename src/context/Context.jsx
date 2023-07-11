import React, {
  createContext,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react";
import domtoimage from "dom-to-image";
import { useNavigate } from "react-router-dom";

// Create a new context for the downloadRef
const DownloadRefContext = createContext();

// Custom hook to access the downloadRef from the context
export const useDownloadRef = () => useContext(DownloadRefContext);

// Custom provider component for the downloadRef context
export const DownloadRefProvider = ({ children }) => {
  const [isExporting, setIsExporting] = useState(false);

  const contextValue = {
    isExporting,
    setIsExporting,
  };

  return (
    <DownloadRefContext.Provider value={contextValue}>
      {children}
    </DownloadRefContext.Provider>
  );
};
