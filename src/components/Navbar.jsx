import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../redux/dashboard";

const Navbar = () => {
  const currentTab = useSelector((state) => state.Dashboard.currentTab);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    dispatch(setCurrentTab(currentTab));
  };

  return (
    <div className=" bg-white p-5  w-full h-16 mb-5 ">
      <div className="flex gap-20 ">
        <h1 className=" text-2xl font-bold tracking-wide mb-10 text-blue-600">
          Invoice Maker
        </h1>
        <BiMenuAltLeft
          onClick={toggleSidebar}
          className="cursor-pointer text-2xl text-gray-500"
        />
      </div>
    </div>
  );
};

export default Navbar;
