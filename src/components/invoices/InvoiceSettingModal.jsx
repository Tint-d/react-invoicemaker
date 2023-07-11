import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, setSettingModal } from "../../redux/invoiceSlice";

const InvoiceSettingModal = () => {
  const settingToggle = useSelector((state) => state.Invoice.settingToggle);
  const color = useSelector((state) => state.Invoice.color);
  const currentColor = useSelector((state) => state.Invoice.defaultColor);
  //   console.log(currentColor);
  const dispatch = useDispatch();
  const settingToggleHandler = () => {
    dispatch(setSettingModal(!settingToggle));
  };

  const currentColorHandler = (color) => {
    dispatch(setColor(color));
  };

  return (
    <div>
      {settingToggle ? (
        <div className="flex justify-center w-96 h-screen mx-auto items-center  fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6  h-52">
            <div className="border-0 rounded-lg shadow-lg relative  w-full bg-white outline-none focus:outline-none h-full">
              {/* advance search */}

              <div className="relative p-6 flex-auto">
                <h2 className="text-gray-700 font-semibold tracking-wide ">
                  Choose Color
                </h2>
                <div className=" flex flex-wrap gap-2 items-center">
                  {color.map((cl) => (
                    <p
                      onClick={() => currentColorHandler(cl)}
                      key={cl}
                      style={{ backgroundColor: cl }}
                      className={`${
                        currentColor === cl &&
                        "border-2 border-solid hover:scale-100 border-gray-400 w-8 h-8 "
                      }  w-6 h-6 rounded-full cursor-pointer select-none hover:scale-125 transition-all duration-300`}
                    ></p>
                  ))}
                </div>
              </div>

              {/* buttons */}
              <div className="absolute bottom-0 left-0 w-full ">
                <div className="flex items-center justify-end h-16 mt-auto bg-gray-200">
                  <button
                    onClick={settingToggleHandler}
                    className="text-gray-500 background-transparent border border-gray-300 rounded-xl font-semibold  px-6 py-2 text-base outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InvoiceSettingModal;
