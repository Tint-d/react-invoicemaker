import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductSelector } from "../../redux/productSlice";
import { defaultInputSmStyle } from "../constants/defaultStyle";
import { BsFillTrashFill } from "react-icons/bs";
import {
  removeExistingProduct,
  setExistingUpdateProduct,
} from "../../redux/invoiceSlice";

const AddExistingProduct = () => {
  const selectID = useSelector((state) => state.Invoice.selectModalID);
  const existProducts = useSelector((state) => state.Invoice.existingProduct);
  const [productForm, setProductForms] = useState(existProducts);
  const allProducts = useSelector(getAllProductSelector);
  const dispatch = useDispatch();

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

      dispatch(setExistingUpdateProduct({ id: productId, field, value }));
    },
    [dispatch]
  );

  const removeInput = (id) => {
    dispatch(removeExistingProduct(id));
  };

  return (
    <div>
      {existProducts.map((product) => {
        return (
          <div className={"flex rounded-xl w-full gap-2 p-3 "} key={product.id}>
            <div className=" flex bg-white w-full">
              <input
                type="text"
                className={defaultInputSmStyle + " text-right"}
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleInputChange(e, product.id, "name")}
              />
            </div>

            <div className="w-full">
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleInputChange(e, product.id, "price")}
                className={defaultInputSmStyle + " text-right"}
              />
            </div>

            <div className="w-full">
              <input
                type="number"
                value={product.amount}
                onChange={(e) => handleInputChange(e, product.id, "amount")}
                className={defaultInputSmStyle + " text-right"}
              />
            </div>

            <div className=" w-full  flex justify-end">
              <div
                className="flex items-center justify-end gap-2 text-xl "
                onClick={() => removeInput(product.id)}
              >
                <span className=" text-base">
                  {product.price * product.amount}
                </span>
                <button className="bg-red-200 p-2 w-8 h-8 flex items-center justify-center rounded-full">
                  <BsFillTrashFill className="text-red-500 text-xl" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddExistingProduct;
