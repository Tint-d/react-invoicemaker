import { Table } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import "./table.css";

const TableCommon = ({ th1, th2, th3, th4, th5, emptyRow,existRow,rows ,bgColor, textColor }) => {
  const bg = `bg-${bgColor}`;
  const color = `text-${textColor}`;
  // const emptyRow = (
  //   <tr className=" flex gap-2 items-center w-[400%] mt-6">
  //     <td className=" flex mx-auto ">Empty...</td>
  //   </tr>
  // );

  return (
    <div className=" w-full ">
      <Table className={`custom-table rounded-xl bg-white`}>
        <thead className={` p-3 ${bg ? bg : ''} `}>
          <tr className="">
            <th  className=" text-2xl text-white   font-bold  ">
              <p className={`${color ? color : ""} l`}>{th1}</p>
            </th>
            <th className=" text-2xl font-bold ">
              <p className={`${color ? color : ""}`}>{th2}</p>
            </th>
            <th className=" text-2xl font-bold">
              <p className={`${color ? color : ""}`}>{th3}</p>
            </th>
            <th className=" text-2xl font-bold ">
              <p className={`${color ? color : ""}`}>{th4}</p>
            </th>
            <th className=" text-2xl font-bold">
              <p className={`${color ? color : ""}`}>{th5}</p>
            </th>
          </tr>
        </thead>
        <tbody className=" w-full">
          {/* {quickProduct.length === 0 ? emptyRow : rows} */}
          {rows}
          {emptyRow}
          {existRow}
        </tbody>
      </Table>
    </div>
  );
};

export default TableCommon;
