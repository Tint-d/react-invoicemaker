import { useEffect } from "react";
import { HiUserPlus } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import {
  defaultInputSmStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import { useState } from "react";
import { useCallback } from "react";
import InvoiceButtons from "./InvoiceButtons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setClientInfo, setClientInfoUpdate } from "../../redux/invoiceSlice";
import { nanoid } from "@reduxjs/toolkit";

const date = new Date();

const clientEmptyForm = {
  id: "",
  name: "",
  address: "",
  mobile: "",
  email: "",
  invoiveNumber: "",
  createDate: "",
  dueDate: "",
};

const InvoiceClientInfo = () => {
  const [clientForm, setClientForm] = useState(clientEmptyForm);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (event, keyName) => {
      const value = event.target.value;

      setClientForm((prev) => {
        return { ...prev, [keyName]: value };
      });

      dispatch({ key: keyName, value });
    },
    [dispatch]
  );

  const handleClick = () => {
    dispatch(
      setClientInfo({
        ...clientForm,
        id: nanoid(),
        createDate: startDate.toLocaleDateString(),
        dueDate: dueDate.toLocaleDateString(),
      })
    );
  };

  const existingClient = () => {};

  return (
    <>
    
      <div className="bg-white p-3 rounded-xl ">
        <div className=" flex items-center gap-3">
          <h3> Billing To</h3>
          <button onClick={existingClient} className={defaultInputSmStyle}>
            <HiUserPlus className="text-blue-600 text-xl" />
            {/* Existing */}
          </button>
        </div>
        <div className="flex justify-between md:flex-wrap">
          <div className="mt-2 w-52 flex flex-col gap-3">
            <div>
              <input
                value={clientForm.name}
                onChange={(e) => handleInputChange(e, "name")}
                className={defaultInputSmStyle}
                placeholder="Client Name"
              />
            </div>
            <div>
              <input
                className={defaultInputSmStyle}
                placeholder="Client Address"
                value={clientForm.address}
                onChange={(e) => handleInputChange(e, "address")}
              />
            </div>
            <div>
              <input
                className={defaultInputSmStyle}
                placeholder="Client Mobile"
                value={clientForm.mobile}
                onChange={(e) => handleInputChange(e, "mobile")}
              />
            </div>
            <div>
              <input
                value={clientForm.email}
                onChange={(e) => handleInputChange(e, "email")}
                className={defaultInputSmStyle}
                placeholder="Client Email"
              />
            </div>
          </div>
          <div className=" flex gap-3">
            <div className="flex flex-col items-center justify-around">
              <p className="text-gray-900 font-medium text-base font-sans">
                Invoice#
              </p>

              <p className="text-gray-900 font-medium text font-sans">
                Creation Date
              </p>
              <p className="text-gray-900 font-medium text font-sans">
                Due Date
              </p>
            </div>
            <div className="flex flex-col items-center justify-around">
              <div className="">
                <input
                  className={defaultInputSmStyle}
                  placeholder="Invoice Number"
                  value={clientForm.invoiveNumber}
                  onChange={(e) => handleInputChange(e, "invoiveNumber")}
                />
              </div>

              <div className=" w-full">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className={defaultInputSmStyle}
                />
              </div>
              <div className=" w-full">
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  className={defaultInputSmStyle}
                />
              </div>
              <div className="w-full">
                <button onClick={handleClick}>submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <InvoiceButtons handleClick={handleClick}/> */}
    </>
  );
};

export default InvoiceClientInfo;
