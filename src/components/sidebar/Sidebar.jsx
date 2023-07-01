import React, { useCallback, useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaFileInvoice } from "react-icons/fa";
import { BiUserCircle, BiUserPlus } from "react-icons/bi";
import { CgTrashEmpty } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import Dashboard from "../../pages/Dashboard";
import Invoices from "../../pages/Invoices";
import Client from "../../pages/Client";
import Products from "../../pages/Products";
import { paths } from "../../routes/path";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.css";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const currentColor = useSelector((state) => state.Dashboard.currentColor);
  const dispatch = useDispatch();

  const company = useSelector((state) => state.Dashboard.company);

  const links = [
    {
      title: "Dashboard",
      id: 1,
      path: paths.Dasboard,
      icon: <AiFillHome />,
    },
    {
      title: "Invoices",
      id: 2,
      path: paths.Invoice,
      icon: <FaFileInvoice />,
    },
    {
      title: "Clients",
      id: 3,
      path: paths.Client,
      icon: <BiUserPlus />,
    },
    {
      title: "Products",
      id: 4,
      path: paths.Product,
      icon: <CgTrashEmpty />,
    },
  ];

  const companyName = company.slice(-1)[0];

  console.log(companyName);

  // const companyName = useEffect(
  //   company.map((pd) => {
  //     if (pd.length) {

  //     }
  //     <div key={pd.id} className=" flex gap-2 items-center">
  //       {pd.image ? (
  //         <img
  //           src={pd.image}
  //           className="object-cover h-10 w-10 rounded-2xl"
  //           alt=""
  //         />
  //       ) : (
  //         <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
  //           <BiUserCircle className=" text-gray-500 text-2xl" />
  //         </span>
  //       )}
  //       <p className=" text-lg text-gray-700 font-semibold">{pd.name}</p>
  //     </div>;
  //   }),
  //   []
  // );
  // console.log(companyName);
  return (
    <div className="h-screen w-64 bg-white  p-5">
      <div className="mb-10 bg-gray-50  h-14 px-2 w-full rounded-lg flex justify-between items-center ">
        {company.length > 0
          ? companyName && (
              <div key={companyName.id} className="flex gap-2 items-center">
                {companyName.image ? (
                  <img
                    src={companyName.image}
                    className="object-cover h-10 w-10 rounded-2xl"
                    alt=""
                  />
                ) : (
                  <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                    <BiUserCircle className="text-gray-500 text-2xl" />
                  </span>
                )}
                <p className="text-lg text-gray-700 font-semibold">
                  {companyName.name}
                </p>
              </div>
            )
          : ""}
        <div className=" w-1 h-8 bg-indigo-600"></div>
      </div>
      <div className="flex flex-col gap-7 w-full">
        {links.map((link) => (
          <div key={link.id}>
            <div className={`flex gap-2 `}>
              <p
                className={`font-semibold text-lg text-gray-500 cursor-pointer `}
              >
                {link.icon}
              </p>
              <NavLink to={link.path}>
                <p
                  className={`font-semibold text-lg text-gray-500 cursor-pointer ${
                    link.title === currentColor ||
                    (link.title === "Dashboard" && currentColor === null)
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  {link.title}
                </p>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
