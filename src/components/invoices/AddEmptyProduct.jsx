import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillDollarCircle, AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductInvoice,
  setExtraFee,
  setExtraFeeRemove,
  setExtraFeeUpdate,
  setModalToggle,
  setTax,
  setTaxRemove,
  setTaxUpdate,
  setTotal,
} from "../../redux/invoiceSlice";
import { BsFillTrashFill } from "react-icons/bs";

import Button from "../Button/Button";
import { IconStyle, defaultInputSmStyle } from "../constants/defaultStyle";
import { current, nanoid } from "@reduxjs/toolkit";
import { TbReceiptTax } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import InvoiceTable from "./InvoiceTable";
import AddNewInvoiceTable from "./AddNewInvoiceTable";
import { useDownloadRef } from "../../context/Context";
import { color } from "framer-motion";

const emptyForm = {
  id: "",
  image: "",
  productID: "",
  name: "",
  amount: 0,
  price: 0,
};

const taxForm = {
  id: "",
  percentage: 5,
};

const extraForm = {
  id: "",
  fee: "1",
  title: "Extra Fee",
};

const AddEmptyProduct = () => {
  const [addNewProduct, setAddNewProduct] = useState(emptyForm);
  const [addTax, setAddtax] = useState(taxForm);
  const [extra, setExtra] = useState(extraForm);
  const invoiceProducts = useSelector((state) => state.Invoice.data);
  const existProducts = useSelector((state) => state.Invoice.existingProduct);
  const { isExporting, setIsExporting } = useDownloadRef();
  const taxPercentage = useSelector((state) => state.Invoice.tax);
  const extraFees = useSelector((state) => state.Invoice.extraFee);
  const currentColor = useSelector((state) => state.Invoice.defaultColor);
  const currentImage = useSelector((state) => state.Invoice.defaultColor);
  const notify = () => {
    toast.error("Already Have Percentage Taxes!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const emptyTotal = invoiceProducts.reduce((initial, current) => {
    return initial + parseFloat(current.price * current.amount);
  }, 0);

  const existTotal = existProducts.reduce((initial, current) => {
    return initial + parseFloat(current.price * current.amount);
  }, 0);

  const subTotal = emptyTotal + existTotal;

  const dispatch = useDispatch();
  const AddEmptyProduct = () => {
    dispatch(addNewProductInvoice({ ...addNewProduct, id: nanoid() }));
  };
  const AddExistProduct = () => {
    dispatch(setModalToggle(true));
  };

  const TaxProduct = () => {
    if (taxPercentage.length === 1) {
      notify();
    }
    dispatch(setTax({ ...addTax, id: 1 }));
  };

  const calculateTax =
    (subTotal / 100) * parseFloat(taxPercentage[0]?.percentage || 0);

  const handleInputChange = useCallback(
    (event, field) => {
      const value = event.target.value;

      setAddtax((prevForm) => ({
        ...prevForm,
        [field]: value,
      }));

      dispatch(setTaxUpdate({ id: 1, field, value }));
    },
    [dispatch]
  );

  const removeTax = (id) => {
    dispatch(setTaxRemove(id));
  };

  const AddExtraFee = () => {
    dispatch(setExtraFee({ ...extra, id: nanoid() }));
  };

  const extraFeeInputChange = useCallback(
    (event, field, productID) => {
      const value = event.target.value;

      setExtra((prevForm) => ({
        ...prevForm,
        [field]: value,
      }));

      dispatch(setExtraFeeUpdate({ id: productID, field, value }));
    },
    [dispatch]
  );

  const removeFee = (id) => {
    dispatch(setExtraFeeRemove(id));
  };

  const extraTotal = extraFees.reduce(
    (initial, current) => initial + parseFloat(current.fee),
    0
  );

  const Total = subTotal + calculateTax + extraTotal;

  useMemo(() => {
    dispatch(setTotal(Total));
  }, [Total]);

  const taxTable = taxPercentage.map((tax) => {
    return (
      <div
        className={
          isExporting
            ? " flex flex-col sm:flex-row rounded-lg sm:visible w-full  py-2 items-center sm:justify-end"
            : "flex rounded-xl justify-end  gap-2 p-3 "
        }
        key={tax.id}
      >
        <div className="flex  w-full  sm:w-1/4 text-right sm:pr-8  flex-row sm:block mb-1">
          <p
            className={
              isExporting
                ? " flex justify-start items-center  w-full text-gray-900 "
                : defaultInputSmStyle +
                  " text-right flex justify-end items-center"
            }
          >
            Tax%
          </p>
        </div>

        {isExporting ? (
          ""
        ) : (
          <div className=" flex  w-full sm:w-1/4 text-right sm:pr-8  flex-row sm:block mb-1">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className={
                  isExporting
                    ? " text-right"
                    : defaultInputSmStyle + " text-right "
                }
                placeholder="Product Name"
                value={tax.percentage}
                onChange={(e) => handleInputChange(e, "percentage")}
              />
              <p>%</p>
            </div>
          </div>
        )}
        <div className="flex  w-full sm:w-1/4 text-right sm:pr-8  flex-row sm:block mb-1">
          <div className="w-full flex justify-end">
            <div
              className={
                isExporting
                  ? " text-gray-900"
                  : "flex items-center justify-end gap-2 text-xl "
              }
              onClick={() => removeTax(tax.id)}
            >
              <span className="text-base">{calculateTax}</span>
              {isExporting ? (
                ""
              ) : (
                <button className="bg-red-200 p-2 w-8 h-8 flex items-center justify-center rounded-full">
                  <BsFillTrashFill className="text-red-500 text-xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  const extraFeeTable = extraFees.map((fee) => {
    return (
      <div
        className={
          isExporting
            ? "flex flex-col sm:flex-row rounded-lg sm:visible w-full  py-2 items-center sm:justify-end"
            : "flex rounded-xl w-full justify-end  gap-2 p-3 "
        }
        key={fee.id}
      >
        <div className=" flex  w-full   sm:w-1/4 text-right sm:pr-8  flex-row sm:block mb-1">
          {isExporting ? (
            <p className="flex justify-start items-center  w-full text-gray-900 ">
              {fee.title}
            </p>
          ) : (
            <input
              placeholder="Fee Title"
              className={
                defaultInputSmStyle +
                " text-right flex justify-end items-center"
              }
              value={fee.title}
              onChange={(e) => extraFeeInputChange(e, "title", fee.id)}
            />
          )}
        </div>
        {isExporting ? (
          ""
        ) : (
          <div className=" flex  w-full sm:w-1/4 text-right sm:pr-8  flex-row sm:block mb-1">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className={defaultInputSmStyle + " text-right "}
                placeholder="Product Name"
                value={fee.fee}
                onChange={(e) => extraFeeInputChange(e, "fee", fee.id)}
              />
            </div>
          </div>
        )}
        <div className="flex  w-full sm:w-1/4 text-right sm:pr-8   flex-row sm:block mb-1">
          <div className=" w-full  flex justify-end">
            <div
              className="flex items-center justify-end gap-2 text-xl "
              onClick={() => removeFee(fee.id)}
            >
              <span className="text-base">{fee.fee}</span>
              {isExporting ? (
                ""
              ) : (
                <button className="bg-red-200 p-2 w-8 h-8 flex items-center justify-center rounded-full">
                  <BsFillTrashFill className="text-red-500 text-xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="mt-5 bg-white p-3 rounded-md">
      <div
        style={{ backgroundColor: currentColor }}
        className=" w-full bg-indigo-700 flex items-center justify-between px-4 h-12 text-white rounded-xl"
      >
        <h1>Description</h1>
        <h1>Price</h1>
        <h1>Qty</h1>
        <h1>Total</h1>
      </div>

      {/* <InvoiceTable /> */}
      <AddNewInvoiceTable />
      {/*product btn */}
      {isExporting ? (
        ""
      ) : (
        <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full px-4 py-2 items-center sm:justify-end">
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <Button size="sm" block={1} onClick={AddEmptyProduct}>
              <AiFillPlusCircle style={IconStyle} className="h-4 w-4" />
              Add Empty Product
            </Button>
          </div>
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <Button size="sm" block={1} onClick={AddExistProduct}>
              <BsFillTrashFill style={IconStyle} className="w-4 h-4" />
              Add Exisiting Product
            </Button>
          </div>
        </div>
      )}
      {/* subtotal */}

      <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full py-2 items-center sm:justify-end">
        <div className=" w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
          <h2 className="flex tracking-wide font-medium text-gray-900 text-lg ">
            Subtotal
          </h2>
        </div>
        <div className=" w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
          <h2 className="">{subTotal.toFixed(2)}</h2>
        </div>
      </div>
      {/* tax fee */}
      {taxTable}
      {extraFeeTable}
      {isExporting ? (
        ""
      ) : (
        <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full px-4 py-2 items-center sm:justify-end">
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <Button size="sm" block={1} onClick={TaxProduct}>
              <TbReceiptTax style={IconStyle} className="h-4 w-4" />
              Add Tax
            </Button>
          </div>
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <Button size="sm" block={1} onClick={AddExtraFee}>
              <AiFillDollarCircle style={IconStyle} className="w-4 h-4" />
              Add Extra Fees
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full px-4 py-2 items-center sm:justify-end ">
        <div
          style={{ backgroundColor: currentColor }}
          className="  rounded-lg w-[50%] flex justify-between items-center h-12"
        >
          <div className=" w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <h2 className=" text-white">Total</h2>
          </div>
          <div className=" w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <h2 className=" text-white">{Total}</h2>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmptyProduct;
