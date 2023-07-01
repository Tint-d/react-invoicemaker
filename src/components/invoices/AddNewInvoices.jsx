import React, { useCallback, useRef } from "react";
import Layout from "../../Layout";
import { IoIosArrowBack } from "react-icons/io";
import { TiEye } from "react-icons/ti";
import { AiFillSetting, AiFillFilePdf } from "react-icons/ai";
import { TbDownload } from "react-icons/tb";
import AddEmptyProduct from "./AddEmptyProduct";
import InvoiceModal from "./InvoiceModal";
import InvoiceButtons from "./InvoiceButtons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setClientInfo, setClientInfoUpdate } from "../../redux/invoiceSlice";
import { nanoid } from "@reduxjs/toolkit";
import { HiUserPlus } from "react-icons/hi2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { defaultInputSmStyle } from "../constants/defaultStyle";
import { useNavigate } from "react-router-dom";
import { setClientModalToggle } from "../../redux/client";
import ExistClientModal from "../client/ExistClientModal";
import { BiUserCircle } from "react-icons/bi";
import { toPng } from "dom-to-image";
import domtoimage from "dom-to-image";
import DownloadImage from "../common/DownloadImage";
import { useDownloadRef } from "../../context/Context";

const clientEmptyForm = {
  id: "",
  name: "",
  address: "",
  mobile: "",
  email: "",
  invoiveNumber: "",
  createDate: "",
  dueDate: "",
  statusName: "Draft",
  subTotal: 0,
  product: [],
  tax: [],
  extraFee: [],
  existProduct: [],
};

const AddNewInvoices = () => {
  const [clientForm, setClientForm] = useState(clientEmptyForm);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const allInvoice = useSelector((state) => state.Invoice.clientInfo);
  const invoiceProducts = useSelector((state) => state.Invoice.data);
  const existProducts = useSelector((state) => state.Invoice.existingProduct);
  const taxPercentage = useSelector((state) => state.Invoice.tax);
  const extraFees = useSelector((state) => state.Invoice.extraFee);
  const total = useSelector((state) => state.Invoice.total);
  const company = useSelector((state) => state.Dashboard.company);
  const existClients = useSelector((state) => state.Client.existingClient);
  const downloadRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isViewMode, setIsViewMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [download, setDownload] = useState(false);

  const handleDownloadImage = useCallback(() => {
    // if (showNavbar) {
    //   toggleNavbar();
    // }
    // setEscapeOverflow(true);
    setIsViewMode(true);
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
          setIsViewMode(false);
          // setEscapeOverflow(false);
        }
      });
  }, []);

  const selectClientModalID = useSelector(
    (state) => state.Client.selectModalID
  );

  const selectClient = existClients.find((pd) => pd.id === selectClientModalID);

  const handleInputChange = useCallback(
    (event, field, productId) => {
      const value = event.target.value;

      setClientForm((prevForms) => ({
        ...prevForms,
        [field]: value,
      }));

      dispatch(setClientInfoUpdate({ id: productId, field, value }));
    },
    [dispatch]
  );

  const emptyTotal = invoiceProducts.reduce((initial, current) => {
    return initial + parseFloat(current.price * current.amount);
  }, 0);

  const existTotal = existProducts.reduce((initial, current) => {
    return initial + parseFloat(current.price * current.amount);
  }, 0);

  const subTotal = emptyTotal + existTotal;

  const handleClick = (status) => {
    dispatch(
      setClientInfo({
        ...clientForm,
        id: nanoid(),
        createDate: startDate.toLocaleDateString(),
        dueDate: dueDate.toLocaleDateString(),
        total,
        statusName: status,
        subTotal: subTotal,
        product: invoiceProducts,
        tax: taxPercentage,
        extraFee: extraFees,
        existProduct: existProducts,
      })
    );
    navigate("/invoice");
  };

  const existClient = () => {
    dispatch(setClientModalToggle(true));
  };

  const companyName = company.slice(-1)[0];

  // const handleDownloadImage = () => {
  //   const targetEl = downloadRef.current;
  //   domtoimage.toJpeg(targetEl, { quality: 1 }).then((dataUrl) => {
  //     let link = document.createElement("a");
  //     link.download = "invoice.jpeg";
  //     link.href = dataUrl;
  //     link.click();
  //   });
  // };

  return (
    <Layout>
      <div>
        <h5 className="text-gray-900 font-semibold tracking-wide text-2xl">
          {" "}
          New Invoice
        </h5>
        <div className=" flex justify-between gap-1 items-center bg-white p-5 rounded-xl my-3">
          <button className=" w-7 h-7 flex items-center  justify-center bg-blue-500 rounded-lg">
            <IoIosArrowBack className=" text-white text-base" />
          </button>
          <button
            className={
              defaultInputSmStyle + " flex justify-center items-center gap-2"
            }
          >
            <TiEye className=" text-blue-600" />
            <p className=" text-blue-600 font-medium align-middle">View Mode</p>
          </button>
          <button
            className={
              defaultInputSmStyle + " flex justify-center items-center gap-2"
            }
          >
            <AiFillSetting className=" text-blue-600" />
            <p className=" text-blue-600 font-medium align-middle">Setting</p>
          </button>
          <button
            className={
              defaultInputSmStyle + " flex justify-center items-center gap-2"
            }
          >
            <AiFillFilePdf className=" text-blue-600" />
            <p className=" text-blue-600 font-medium align-middle">
              Export PDF
            </p>
          </button>{" "}
          <button
            onClick={handleDownloadImage}
            className={
              defaultInputSmStyle + " flex justify-center items-center gap-2"
            }
          >
            <TbDownload className=" text-blue-600" />
            <p className=" text-blue-600 font-medium align-middle">
              Download Image
            </p>
          </button>
        </div>

        {/* DownloadImage */}

        <div>
          {/*  Company*/}
          <div className="mb-3 bg-white p-5 w-full rounded-lg flex justify-between items-center ">
            {company?.length > 0
              ? companyName && (
                  <div
                    key={companyName.id}
                    className="flex gap-2 items-center "
                  >
                    {companyName.image ? (
                      <img
                        src={companyName?.image}
                        className="object-cover h-20 w-20"
                        alt=""
                      />
                    ) : (
                      <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                        <BiUserCircle className="text-gray-500 text-2xl" />
                      </span>
                    )}
                    <div>
                      <p className=" mb-3 text-gray-700 font-semibold">
                        {companyName?.name}
                      </p>
                      <p className=" text-gray-600 text-sm font-normal">
                        {companyName?.address}
                      </p>
                      <p className=" text-gray-600 text-sm font-normal">
                        {companyName?.mobile}
                      </p>
                      <p className=" text-gray-600 text-sm font-normal">
                        {companyName?.email}
                      </p>
                    </div>
                  </div>
                )
              : ""}
            <div className="">
              <h2 className="text-gray-700 font-semibold text-xl tracking-wide">
                Invoice
              </h2>
            </div>
          </div>

          {/* <InvoiceClientInfo /> */}
          <div className="bg-white p-3 rounded-xl ">
            <div className=" flex items-center gap-3">
              <h3> Billing To</h3>
              <button
                onClick={existClient}
                className="rounded-xl px-7 text-indigo-500 py-1 border-2 border-solid border-indigo-300 h-8 text-sm flex justify-center items-center gap-2"
              >
                <HiUserPlus className="text-blue-600 text-xl" />
                Existing
              </button>
            </div>
            <div className="flex justify-between md:flex-wrap">
              <div className="mt-2 w-52 flex flex-col gap-3">
                <div>
                  <input
                    defaultValue={clientForm.name || selectClient?.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    className={defaultInputSmStyle}
                    placeholder="Client Name"
                  />
                </div>
                <div>
                  <input
                    className={defaultInputSmStyle}
                    placeholder="Client Address"
                    defaultValue={clientForm.address || selectClient?.billing}
                    onChange={(e) => handleInputChange(e, "address")}
                  />
                </div>
                <div>
                  <input
                    className={defaultInputSmStyle}
                    placeholder="Client Mobile"
                    defaultValue={clientForm.mobile || selectClient?.mobile}
                    onChange={(e) => handleInputChange(e, "mobile")}
                  />
                </div>
                <div>
                  <input
                    defaultValue={clientForm.email || selectClient?.email}
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
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <AddEmptyProduct />
        <InvoiceModal showAdvancesearch />
        <InvoiceButtons handleClick={handleClick} />
        <ExistClientModal />
      </div>
    </Layout>
  );
};

export default AddNewInvoices;
