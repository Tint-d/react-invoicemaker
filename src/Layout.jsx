import { Box, Flex, Paper } from "@mantine/core";
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import "./index.css";

const Layout = ({ children }) => {
  const currentTab = useSelector((state) => state.Dashboard.currentTab);

  return (
    <Flex className=" h-screen font-sans w-full">
      <div className="flex flex-1  flex-col">
        <Navbar />
        <div className=" flex flex-1 h-screen">
          {currentTab && <Sidebar />}
          <div
            style={{ overflow: "scroll", height: "100vh", transition: "all" ,}}
            className=" flex-1 p-[1rem] bg-gray-100"
          >
            {children}
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default Layout;
