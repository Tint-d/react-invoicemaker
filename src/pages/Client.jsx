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
        
        <div className=" lg:flex lg:flex-row lg:justify-between md:gap-5 sm:flex sm:flex-col sm:gap-4">
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
