import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../Layout";
import { IoIosArrowBack } from "react-icons/io";
import { TiEye } from "react-icons/ti";
import { AiFillFilePdf, AiFillSetting } from "react-icons/ai";
import { TbDownload } from "react-icons/tb";
import {
  defaultInputSmStyle,
  defaultTdContent,
  defaultTdContentTitleStyle,
  defaultTdStyle,
  defaultTdWrapperStyle,
} from "../constants/defaultStyle";
import { BiUserCircle } from "react-icons/bi";

const InvoiceDetail = () => {
  const { id } = useParams();
  const allInvoice = useSelector((state) => state.Invoice.clientInfo);

  const invoice = allInvoice.find((invoice) => invoice.id === id);
  const taxPercentage = useSelector((state) => state.Invoice.tax);
  const extraFees = useSelector((state) => state.Invoice.extraFee);
  const company = useSelector((state) => state.Dashboard.company);
  const existClients = useSelector((state) => state.Client.existingClient);
  const selectClientModalID = useSelector(
    (state) => state.Client.selectModalID
  );

  const selectClient = existClients.find((pd) => pd.id === selectClientModalID);

  const name = invoice?.product.map((pd) => <div key={pd.id}>{pd.name}</div>);
  const price = invoice?.product.map((pd) => <div key={pd.id}>{pd.price}</div>);
  const amount = invoice?.product.map((pd) => (
    <div key={pd.id}>{pd.amount}</div>
  ));
  const itemTotal = invoice?.product.map((pd) => (
    <div key={pd.id}>{pd.amount * pd.amount}</div>
  ));

  const name2 = invoice?.existProduct.map((pd) => <p key={pd.id}>{pd.name}</p>);
  const price2 = invoice?.existProduct.map((pd) => (
    <p key={pd.id}>{pd.price}</p>
  ));
  const amount2 = invoice?.existProduct.map((pd) => (
    <p key={pd.id}>{pd.amount}</p>
  ));
  const itemTotal2 = invoice?.existProduct.map((pd) => (
    <p key={pd.id}>{pd.price * pd.amount}</p>
  ));

  const calculateTax =
    (invoice.subTotal / 100) * parseFloat(taxPercentage[0]?.percentage || 0);

  const percentage = invoice.tax.map((t) => (
    <div key={t.id}>{t.percentage}</div>
  ));

  const extraFeeName = (
    <ul>
      {invoice.extraFee.map((fee) => (
        <li key={fee.id}>{fee.title}</li>
      ))}
    </ul>
  );
  const extraFee = (
    <ul>
      {invoice.extraFee.map((fee) => (
        <li key={fee.id}>{fee.fee}</li>
      ))}
    </ul>
  );

  const companyName = company.slice(-1)[0];

  return (
    <Layout>
      <h2 className=" text-2xl font-semibold text-gray-700">
        Invoice Detail{" "}
        <span
          className={`${
            invoice.statusName === "Paid"
              ? "text-green-500"
              : invoice.statusName === "Unpaid"
              ? "text-red-500"
              : " text-gray-500"
          } `}
        >
          {" "}
          {invoice.statusName}
        </span>
      </h2>
      <div className=" flex justify-between gap-1 items-center bg-white p-5 rounded-xl my-3">
        <button className=" w-7 h-7 flex items-center mr-3 justify-center bg-blue-500 rounded-lg">
          <IoIosArrowBack className=" text-white text-base" />
        </button>
        <button className={defaultInputSmStyle +" flex justify-center items-center gap-2"}>
          <TiEye className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">View Mode</p>
        </button>
        <button className={defaultInputSmStyle +" flex justify-center items-center gap-2"}>
          <AiFillSetting className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">Setting</p>
        </button>
        <button className={defaultInputSmStyle +" flex justify-center items-center gap-2"}>
          <AiFillFilePdf className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">Export PDF</p>
        </button>{" "}
        <button className={defaultInputSmStyle +" flex justify-center items-center gap-2"}>
          <TbDownload className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">Download Image</p>
        </button>
      </div>
      <div className="mb-3 bg-white p-5 w-full rounded-lg flex justify-between items-center ">
        {company?.length > 0
          ? companyName && (
              <div key={companyName.id} className="flex gap-2 items-center">
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
      <div className="bg-white p-3 rounded-xl">
        <div className="  flex justify-around">
          <div>
            <h5 className="text-lg font-semibold">Billing to</h5>
            <p>{invoice?.name || selectClient?.name}</p>
            <p>{invoice?.address}</p>
          </div>
          <div className="">
            <p>INVOICE #</p>
            <p> Creation Date</p>
            <p>Due Date</p>
          </div>
          <div className="">
            <p>{invoice?.invoiveNumber}</p>
            <p>{invoice?.createDate}</p>
            <p>{invoice?.dueDate}</p>
          </div>
        </div>
        <div className=" w-full mt-3 bg-indigo-700 flex items-center justify-between px-4 h-12 text-white rounded-xl">
          <h1>Description</h1>
          <h1>Price</h1>
          <h1>Qty</h1>
          <h1>Total</h1>
        </div>
        <div className=" flex items-center justify-between px-4 bg-gray-50 mt-3 p-2">
          <div>{name}</div>
          <div>{price}</div>
          <div>{amount}</div>
          <div>{itemTotal}</div>
        </div>
        {invoice?.existProduct.length > 0 && (
          <div className=" flex items-center justify-between px-4 bg-gray-50 mt-3 p-2">
            <div>{name2}</div>
            <div>{price2}</div>
            <div>{amount2}</div>
            <div>{itemTotal2}</div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full px-4 py-2 items-center sm:justify-end">
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <h2 className="flex tracking-wide font-medium text-gray-500 text-lg ">
              Subtotal
            </h2>
          </div>
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <h2 className="">{invoice?.subTotal.toFixed(2)}</h2>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full px-4 py-2 items-center sm:justify-end">
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <h2 className="flex tracking-wide font-medium text-gray-500 text-lg ">
              Tax -{percentage}%
            </h2>
          </div>
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <h2 className="">{calculateTax}</h2>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full px-4 py-2 items-center sm:justify-end">
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            <div className="flex tracking-wide font-medium text-gray-500 text-lg ">
              {extraFeeName}
            </div>
          </div>
          <div className="font-title w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
            {extraFee}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row rounded-lg sm:visible w-full px-4 py-2 items-center sm:justify-end ">
          <div className=" bg-indigo-700 rounded-lg w-[50%] flex justify-between items-center h-12">
            <div className=" w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
              <h2 className=" text-white">Total</h2>
            </div>
            <div className=" w-full sm:w-1/4 text-right sm:pr-8 flex flex-row sm:block mb-1">
              <h2 className=" text-white">{invoice.total}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center bg-white p-5 rounded-xl my-3">
        <button className=" w-7 h-7 flex items-center mr-3 justify-center bg-blue-500 rounded-lg">
          <IoIosArrowBack className=" text-white text-base" />
        </button>
        <button className=" border border-blue-500 w-52 h-10 flex gap-1 items-center justify-center rounded-lg">
          <TiEye className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">View Mode</p>
        </button>
        <button className=" border border-blue-500 w-52 h-10 flex gap-1 items-center justify-center rounded-lg">
          <AiFillSetting className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">Setting</p>
        </button>
        <button className=" border border-blue-500 w-52 h-10 flex gap-1 items-center justify-center rounded-lg">
          <AiFillFilePdf className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">Export PDF</p>
        </button>{" "}
        <button className=" border border-blue-500 w-52 h-10 flex gap-1 items-center justify-center rounded-lg">
          <TbDownload className=" text-blue-600" />
          <p className=" text-blue-600 font-medium align-middle">View Mode</p>
        </button>
      </div>
    </Layout>
  );
};

export default InvoiceDetail;
