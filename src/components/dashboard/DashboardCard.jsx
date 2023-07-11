import React from "react";
import Lottie from "lottie-react";
import clientAnimation from "../../lottie/client.json";
import invoiceAnimation from "../../lottie/invoice.json";
import totalAnimation from "../../lottie/total.json";
import productAnimation from "../../lottie/product.json";
import { useSelector } from "react-redux";
import { getAllProductSelector } from "../../redux/productSlice";
import InvoiceTable from "../invoices/InvoiceTable";
import ClientTable from "../client/ClientTable";

const DashboardCard = () => {
  const allInvoice = useSelector((state) => state.Invoice.clientInfo);
  const allProducts = useSelector(getAllProductSelector);
  const allClient = useSelector((state) => state.Client.data);
  const color = useSelector((state) => state.Invoice.defaultColor);
  const Total = allInvoice.reduce(
    (initial, current) => initial + current.total,
    0
  );
  // console.log(Total);

  return (
    <div className="flex-1  flex flex-wrap w-full gap-5">
      {/* card lottie */}
     
      <div className="  w-[48%]  bg-white p-5 flex rounded-lg items-center justify-between">
        <div>
          <h6 className="text-gray-600 text-lg">Total Balance</h6>
          <Lottie animationData={totalAnimation} className="w-20 h-20" />
        </div>
        <p className="text-gray-600 text-2xl">{Total}</p>
      </div>
      <div className="w-[48%]  bg-white p-5 flex rounded-lg items-center justify-between">
        <div>
          <h6 className="text-gray-600 text-lg">Total Products</h6>
          <Lottie animationData={productAnimation} className="w-20 h-20" />
        </div>
        <p className="text-gray-600 text-2xl">{allProducts.length}</p>
      </div>
      <div className=" w-[48%] bg-white p-5 flex rounded-lg items-center justify-between">
        <div>
          <h6 className="text-gray-600 text-lg">Total Invoices</h6>
          <Lottie animationData={invoiceAnimation} className="w-20 h-20" />
        </div>
        <p className="text-gray-600 text-2xl">{allInvoice.length}</p>
      </div>
      <div className=" w-[48%] bg-white p-5 flex rounded-lg items-center justify-between">
        <div>
          <h6 className="text-gray-600 text-lg">Total Clients</h6>
          <Lottie animationData={clientAnimation} className="w-20 h-20" />
        </div>
        <p className="text-gray-600 text-2xl">{allClient.length}</p>
      </div>
      {/* card lottie */}

    
      <InvoiceTable advance="false" />
      <ClientTable advance="false" />
    </div>
  );
};

export default DashboardCard;
