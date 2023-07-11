import { MenuItem } from "@szhsin/react-menu";
import React, { useCallback, useEffect, useState } from "react";
import {
  IconStyle,
  defaultInputSmStyle,
  defaultTdActionStyle,
  defaultTdContent,
  defaultTdContentTitleStyle,
  defaultTdStyle,
  defaultTdWrapperStyle,
} from "../constants/defaultStyle";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { removeProduct, updateProduct } from "../../redux/invoiceSlice";
import Button from "../Button/Button";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { updateNewProductFormField } from "../../redux/productSlice";
import InvoiceModal from "./InvoiceModal";
import AddExistingProduct from "./AddExistingProduct";
import { useDownloadRef } from "../../context/Context";

const emptyForm = {
  name: "",
  amount: 1,
  price: 1,
};

const AddNewInvoiceTable = () => {
  const [productForms, setProductForms] = useState(emptyForm);
  const invoiceProducts = useSelector((state) => state.Invoice.data);
  const taxPercentage = useSelector((state) => state.Invoice.tax);
  const { isExporting } = useDownloadRef();
  const dispatch = useDispatch();

  const removeInput = (id) => {
    dispatch(removeProduct(id));
  };

  const handleInputChange = useCallback(
    (event, productId, field) => {
      const value = event.target.value;

      setProductForms((prevForms) => ({
        ...prevForms,
        [productId]: {
          ...prevForms[productId],
          [field]: value,
        },
      }));

      dispatch(updateProduct({ id: productId, field, value }));
    },
    [dispatch]
  );

  useEffect(() => {
    const initialForms = invoiceProducts.reduce((forms, product) => {
      return {
        ...forms,
        [product.id]: {
          name: product.name,
          price: product.price,
          amount: product.amount,
        },
      };
    }, {});

    setProductForms(initialForms);
  }, [invoiceProducts]);

  const emptyTable = invoiceProducts.map((product) => {
    const productForm = productForms[product.id] || emptyForm;
    return (
      <div className={"flex rounded-xl w-full gap-2 p-3 "} key={product.id}>
        <div className=" flex bg-white w-full">
          <input
            type="text"
            className={isExporting ? "text-left"  : defaultInputSmStyle + " text-right"}
            placeholder="Product Name"
            value={productForm.name}
            onChange={(e) => handleInputChange(e, product.id, "name")}
          />
        </div>

        <div className="w-full">
          <input
            type="number"
            className={isExporting ? "text-right"  : defaultInputSmStyle + " text-right"}
            value={productForm.price}
            onChange={(e) => handleInputChange(e, product.id, "price")}
          />
        </div>

        <div className="w-full">
          <input
            type="number"
            className={isExporting ? "text-right" : defaultInputSmStyle + " text-right"}
            value={productForm.amount}
            onChange={(e) => handleInputChange(e, product.id, "amount")}
          />
        </div>

        <div className=" w-full  flex justify-end">
          <div className="flex items-center justify-end gap-2 text-xl ">
            <span className=" text-base">{product.price * product.amount}</span>
            {isExporting ? (
              ""
            ) : (
              <button
                onClick={() => removeInput(product.id)}
                className="bg-red-200 p-2 w-8 h-8 flex items-center justify-center rounded-full"
              >
                <BsFillTrashFill className="text-red-500 text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {emptyTable}
      <AddExistingProduct />
    </>
  );
};

export default AddNewInvoiceTable;
