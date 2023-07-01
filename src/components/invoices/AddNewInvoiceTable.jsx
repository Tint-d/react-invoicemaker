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

const emptyForm = {
  name: "",
  amount: 1,
  price: 1,
};

const AddNewInvoiceTable = () => {
  const [productForms, setProductForms] = useState(emptyForm);
  const invoiceProducts = useSelector((state) => state.Invoice.data);
  const taxPercentage = useSelector((state) => state.Invoice.tax);
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
            value={productForm.name}
            className={defaultInputSmStyle + " text-right"}
            placeholder="Product Name"
            onChange={(e) => handleInputChange(e, product.id, "name")}
          />
        </div>

        <div className="w-full">
          <input
            type="number"
            value={productForm.price}
            onChange={(e) => handleInputChange(e, product.id, "price")}
            className={defaultInputSmStyle + " text-right"}
          />
        </div>

        <div className="w-full">
          <input
            type="number"
            value={productForm.amount}
            onChange={(e) => handleInputChange(e, product.id, "amount")}
            className={defaultInputSmStyle + " text-right"}
          />
        </div>

        <div className=" w-full  flex justify-end">
          <div
            className="flex items-center justify-end gap-2 text-xl "
            onClick={() => removeInput(product.id)}
          >
            <span className=" text-base">{product.price * product.amount}</span>
            <button className="bg-red-200 p-2 w-8 h-8 flex items-center justify-center rounded-full">
              <BsFillTrashFill className="text-red-500 text-xl" />
            </button>
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
