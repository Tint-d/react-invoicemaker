import React from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { paths } from "../routes/path";
import { AiFillFileImage } from "react-icons/ai";
import { useSelector } from "react-redux";
import InvoiceTable from "../components/invoices/InvoiceTable";
import Button from "../components/Button/Button";

const Invoices = () => {
  const currentColor = useSelector((state) => state.Invoice.defaultColor);
  return (
    <>
      <Layout>
        <div className=" flex items-center gap-5 mb-3">
          <h3
          
            className=" px- text-2xl text-gray-900 tracking-wide font-semibold"
          >
            Invoices
          </h3>
          <Link className=" w-full" to={paths.Invoice_New}>
            <Button block={1} size="sm">
              <AiFillFileImage className=" text-2xl" /> Add New Invoice
            </Button>
          </Link>
        </div>
        <div>
          <InvoiceTable />
        </div>
      </Layout>
    </>
  );
};

export default Invoices;
