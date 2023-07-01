import React from "react";
import Layout from "../Layout";
import DashboardCard from "../components/dashboard/dashboardCard";
import { AiFillFileImage } from "react-icons/ai";
import QuickEditCompany from "../components/dashboard/QuickEditCompany";
import { Link } from "react-router-dom";
import { paths } from "../routes/path";
import InvoiceTable from "../components/invoices/InvoiceTable";
import ClientForm from "../components/client/ClientForm";
import Button from "../components/Button/Button";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="  h-full w-full">
          <h2 className=" text-2xl text-gray-900 font-semibold tracking-wide">
            Dashboard
          </h2>
          <div className=" flex gap-2">
            <div className="w-4/6">
              <DashboardCard />
            </div>
            <div className="w-2/6 h-full ">
              <Link to={paths.Invoice_New} className="">
                <Button block={1}>
                  <AiFillFileImage className=" text-white text-xl " /> Add New
                  Invoice
                </Button>
              </Link>
              <div className="mt-3">
                <QuickEditCompany />
              </div>
              <div className="mt-3">
                <ClientForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
