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
import "./sidebar.css";
import { color, motion } from "framer-motion";
import { setCurrentTab } from "../../redux/dashboard";

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.Dashboard.currentTab);
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

  // const width = window.innerWidth;

  // if (width <= 767) {
  //   dispatch(setCurrentTab(false));
  // }

  return (
    <div className="h-screen w-64 bg-white  p-5">
      <div
        className={`${
          company.length > 0 &&
          "mb-10 bg-gray-50  h-14 px-2 w-full rounded-lg flex justify-between items-center "
        } `}
      >
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
          : null}
        <div
          className={`${company.length > 0 && " w-1 h-8 bg-indigo-600"}`}
        ></div>
      </div>
      <div className="flex flex-col gap-7 w-full">
        {links.map((link) => (
          <motion.div
            key={link.id}
            whileHover={{
              scale: 0.95,
              backgroundColor: "#3b82f6",
              borderRadius:"20px",
              // color:"white"
            }}
            transition={{ duration: 0.5, yoyo: Infinity }}
          >
            <NavLink to={link.path} className={`flex gap-2 px-4 `}>
              <p
                className={`font-semibold text-lg py-2  text-gray-900 cursor-pointer `}
              >
                {link.icon}
              </p>
              <p
                className={`font-semibold text-lg py-2 text-gray-900 cursor-pointer`}
              >
                {link.title}
              </p>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

// whileHover={{
//   scale: [1.03, 1, 1.03, 1, 1.03, 1, 1.03, 1],
//   color: "rgb(14 136 14)",
//   textShadow: "0px 0px 3px #85FF66",
//   transition: {
//     backgroundColor: {
//       type: "spring",
//       damping: 18,
//     },
//   },
// }}
// whileTap={{ scale: 0.9 }}
