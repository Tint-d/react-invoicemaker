import React, { useCallback, useRef } from "react";
import Layout from "../../Layout";
import { IoIosArrowBack } from "react-icons/io";
import { TiEye } from "react-icons/ti";
import { AiFillSetting, AiFillFilePdf, AiFillPrinter } from "react-icons/ai";
import { TbDownload } from "react-icons/tb";
import AddEmptyProduct from "./AddEmptyProduct";
import InvoiceModal from "./InvoiceModal";
import InvoiceButtons from "./InvoiceButtons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setClientInfo,
  setClientInfoUpdate,
  setSettingModal,
} from "../../redux/invoiceSlice";
import { nanoid } from "@reduxjs/toolkit";
import { HiUserPlus } from "react-icons/hi2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { defaultInputSmStyle } from "../constants/defaultStyle";
import { Link, useNavigate } from "react-router-dom";
import { setClientModalToggle } from "../../redux/client";
import ExistClientModal from "../client/ExistClientModal";
import { BiUserCircle } from "react-icons/bi";
import domtoimage from "dom-to-image";
import { useDownloadRef } from "../../context/Context";
import { setCurrentTab } from "../../redux/dashboard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceSettingModal from "./InvoiceSettingModal";
import { useReactToPrint } from "react-to-print";
import { paths } from "../../routes/path";
import {motion} from "framer-motion"

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
  const settingToggle = useSelector((state) => state.Invoice.settingToggle);
  const currentColor = useSelector((state) => state.Invoice.defaultColor);
  const downloadRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isViewMode, setIsViewMode] = useState(false);
  const { isExporting, setIsExporting } = useDownloadRef();
  const printRef = useRef(null);
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  const handleDownloadImage = useCallback(() => {
    if (setCurrentTab) {
      dispatch(setCurrentTab(false));
    }
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
  }, [isExporting, dispatch]);

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

  const generatePdf = useCallback(async () => {
    if (setCurrentTab) {
      dispatch(setCurrentTab(false));
    }
    setIsExporting(true);
    setIsViewMode(true);
    try {
      const targetElement = ref.current;
      const scale = 2;
      const canvas = await html2canvas(targetElement, { scale });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, dispatch]);

  const settingToggleHandler = () => {
    dispatch(setSettingModal(!settingToggle));
  };

  const reactToPrintContent = useCallback(() => {
    return printRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Invoice Letter",

    onBeforeGetContent: useCallback(() => {
      setLoading(true);
    }, []),
    onAfterPrint: useCallback(() => {
      setIsExporting(false);
      setLoading(false);
    }, []),
    removeAfterPrint: true,
  });

  const handleExport = useCallback(() => {
    setIsViewMode(true);
    setIsExporting(true);
    setTimeout(() => {
      setLoading(true);
      handlePrint();
    }, 2000);
  }, [handlePrint]);

  if (loading) {
    return (
      <p className=" h-screen flex justify-center items-center">loading...</p>
    );
  }

  return (
    <Layout>
      <div className="">
        <h5
          style={{ color: currentColor }}
          className="text-gray-900 font-semibold tracking-wide text-2xl"
        >
          {" "}
          New Invoice
        </h5>
        <div className=" flex gap-1 items-center bg-white p-5 rounded-xl my-3">
          <Link to={paths.Invoice}>
            <button className=" w-7 h-7 flex items-center  justify-center bg-blue-500 rounded-lg">
              <IoIosArrowBack className=" text-white text-base" />
            </button>
          </Link>
          <button
            className={
              defaultInputSmStyle + " flex justify-center items-center gap-2"
            }
            onClick={handleExport}
          >
            <AiFillPrinter className=" text-blue-600" />
            <p className=" text-blue-600 font-medium align-middle">Print</p>
          </button>
          <button
            onClick={settingToggleHandler}
            className={
              defaultInputSmStyle + " flex justify-center items-center gap-2"
            }
          >
            <AiFillSetting className=" text-blue-600" />
            <p className=" text-blue-600 font-medium align-middle">Setting</p>
          </button>
          <div className=" flex-1  ">
            <button
              onClick={generatePdf}
              className={
                defaultInputSmStyle + " flex justify-center items-center gap-2"
              }
            >
              <AiFillFilePdf className=" text-blue-600" />
              <p className=" text-blue-600 font-medium align-middle">
                {/* {loading ? "Export Pdf" : "loading"} */}
                Export PDF
              </p>
            </button>
          </div>
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

        <div ref={downloadRef}>
          {/*  Company*/}
          <div ref={ref}>
            <div ref={printRef}>
              <div
                className={`
                
              ${
                company?.length > 0
                  ? "mb-3 bg- p-5 w-full rounded-lg flex justify-between items-center "
                  : ""
              }
            `}
              >
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
                          <span className="h-10 w-10 rounded-2xl bg--100 flex justify-center items-center">
                            <BiUserCircle className="text-white text-2xl" />
                          </span>
                        )}
                        <div>
                          <p className=" mb-3 text-white font-semibold">
                            {companyName?.name}
                          </p>
                          <p className=" text-white text-sm font-normal">
                            {companyName?.address}
                          </p>
                          <p className=" text-white text-sm font-normal">
                            {companyName?.mobile}
                          </p>
                          <p className=" text-white text-sm font-normal">
                            {companyName?.email}
                          </p>
                        </div>
                      </div>
                    )
                  : ""}

                {company.length > 0 ? (
                  <h2
                    className={`text-white text-4xl font-semibold tracking-wide`}
                  >
                    Invoice
                  </h2>
                ) : (
                  ""
                )}
              </div>
              {/* <InvoiceClientInfo /> */}
              <div className="bg-white p-3 rounded-xl ">
                <div className=" flex items-center gap-3">
                  {isExporting ? (
                    ""
                  ) : (
                    <>
                      <h3> Billing To</h3>
                      <button
                        onClick={existClient}
                        className="rounded-xl px-7 text-indigo-500 py-1 border-2 border-solid border-indigo-300 h-8 text-sm flex justify-center items-center gap-2"
                      >
                        <HiUserPlus className="text-blue-600 text-xl" />
                        Existing
                      </button>
                    </>
                  )}
                </div>
                <div className="flex justify-between md:flex-wrap">
                  <div className="mt-2 w-52 flex flex-col gap-3">
                    <div>
                      <input
                        defaultValue={clientForm.name || selectClient?.name}
                        onChange={(e) => handleInputChange(e, "name")}
                        className={isExporting ? "" : defaultInputSmStyle}
                        placeholder="Client Name"
                      />
                    </div>
                    <div>
                      <input
                        className={isExporting ? "" : defaultInputSmStyle}
                        placeholder="Client Address"
                        defaultValue={
                          clientForm.address || selectClient?.billing
                        }
                        onChange={(e) => handleInputChange(e, "address")}
                      />
                    </div>
                    <div>
                      <input
                        className={isExporting ? "" : defaultInputSmStyle}
                        placeholder="Client Mobile"
                        defaultValue={clientForm.mobile || selectClient?.mobile}
                        onChange={(e) => handleInputChange(e, "mobile")}
                      />
                    </div>
                    <div>
                      <input
                        defaultValue={clientForm.email || selectClient?.email}
                        onChange={(e) => handleInputChange(e, "email")}
                        className={isExporting ? "" : defaultInputSmStyle}
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
                          className={isExporting ? "" : defaultInputSmStyle}
                          placeholder="Invoice Number"
                          value={clientForm.invoiveNumber}
                          onChange={(e) =>
                            handleInputChange(e, "invoiveNumber")
                          }
                        />
                      </div>

                      <div className=" w-full">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className={isExporting ? "" : defaultInputSmStyle}
                        />
                      </div>
                      <div className=" w-full">
                        <DatePicker
                          selected={dueDate}
                          onChange={(date) => setDueDate(date)}
                          className={isExporting ? "" : defaultInputSmStyle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <AddEmptyProduct />
            </div>
          </div>
        </div>
        {/* <CompoPrint  /> */}
        <InvoiceModal showAdvancesearch />
        <InvoiceSettingModal />
        <InvoiceButtons handleClick={handleClick} />
        <ExistClientModal />
      </div>
    </Layout>
  );
};

export default AddNewInvoices;
