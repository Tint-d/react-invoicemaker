import React, { useCallback } from "react";
import Button from "../Button/Button";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsShieldFillCheck } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceButtons = ({ handleClick }) => {
 
  const notify = (san) => {
    if (san === "paid") {
      toast.success("You save paid !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (san === "unpaid") {
      toast.error("You save unpaid !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast.warn("You save draft !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div className=" mt-3 bg-white p-3 flex w-full  rounded-xl gap-2 items-center">
      <Button
        outlined={1}
        size="sm"
        secondary={1}
        onClick={() => handleClick("Draft", notify("draft"))}
      >
        <div className=" flex gap-2 items-center">
          <IoIosCheckmarkCircleOutline className={"text-lg font-bold"} />
          <span className=" font-semibold">Save As Draft</span>
        </div>
      </Button>

      <Button
        outlined="true"
        size="sm"
        danger={1}
        onClick={() => handleClick("Unpaid", notify("unpaid"))}
      >
        <div className="flex gap-2 items-center">
          <AiFillDollarCircle className={"text-lg font-bold"} />
          <span className=" font-semibold">Save As Unpaid</span>
        </div>
      </Button>

      <Button
        block={1}
        size="sm"
        success={1}
        onClick={() => handleClick("Paid", notify("paid"))}
      >
        <div className="flex gap-2 items-center">
          <BsShieldFillCheck />
          <span className="font-semibold">Save As Paid</span>
        </div>
      </Button>
    </div>
  );
};

export default InvoiceButtons;

// disible.peter@TbBrandGmail.com
