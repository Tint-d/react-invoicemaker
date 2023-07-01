import React from "react";
import Layout from "../Layout";
import { AiFillFileImage } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import ClientTable from "../components/client/ClientTable";
import ClientForm from "../components/client/ClientForm";

const Client = () => {
  return (
    <div>
      <Layout>
        <h3 className=" px- text-2xl text-gray-900 tracking-wide font-semibold">
          Clients
        </h3>
        <div className=" flex justify-between gap-5">
          <div className=" flex-1">
            <ClientTable showAdvanceSearch />
          </div>
          <div>
            <ClientForm/>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Client;
