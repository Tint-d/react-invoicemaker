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
  const downloadRef = useRef();

  const handleDownloadImage = useCallback(() => {
    // if (showNavbar) {
    //   toggleNavbar();
    // }
    // setEscapeOverflow(true);
    // setIsViewMode(true);
    setIsExporting(true);
    domtoimage
      .toJpeg(downloadRef.current, { quality: 1 })
      .then(async (dataUrl) => {
        try {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          let a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "invoice.jpeg";
          a.hidden = true;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch (e) {
          console.log(e);
        } finally {
          setIsExporting(false);
          // setEscapeOverflow(false);
        }
      });
  }, [setIsExporting]);

  // const handleDownloadImage = async () => {
  //   const targetEl = downloadRef.current;
  //   try {
  //     const dataUrl = await domtoimage.toJpeg(targetEl, { quality: 1 });
  //     let link = document.createElement("a");
  //     link.download = "my-image-name.jpeg";
  //     link.href = dataUrl;
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error generating download image:", error);
  //   }
  // };

  // Provide the downloadRef and handleDownloadImage function to the context
  const contextValue = {
    downloadRef,
    handleDownloadImage,
    isExporting,
    setIsExporting,
  };

  return (
    <DownloadRefContext.Provider value={contextValue}>
      {children}
    </DownloadRefContext.Provider>
  );
};
