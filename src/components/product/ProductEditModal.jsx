import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../common/ImageUploader";
import { motion } from "framer-motion";
import {
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import { onConfirmEditProduct, setEditedId } from "../../redux/productSlice";

const emptyForm = {
  id: "",
  image: "",
  productID: "",
  name: "",
  amount: 0,
  price: 0,
};

const ProductEditModal = () => {
  const editedID = useSelector((state) => state.Product.editedID);
  const [isTouched, setIsTouched] = useState(false);
  const allProduct = useSelector((state) => state.Product.data);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );
  const [productForm, setProductForm] = useState(emptyForm);
  const dispatch = useDispatch();

  const handlerProductValue = useCallback(
    (event, keyName) => {
      const value = event.target.value;

      setProductForm((prev) => {
        return { ...prev, [keyName]: value };
      });
    },
    [dispatch]
  );

  const imageUploadClasses = useMemo(() => {
    const defaultStyle = "rounded-xl ";

    if (productForm.image) {
      return defaultStyle + " ";
    }

    if (!productForm.image) {
      return defaultStyle + " border-dashed border-2 border-indigo-400 ";
    }

    return defaultStyle;
  }, [productForm]);

  const onChangeImage = useCallback((str) => {
    setProductForm((prev) => ({
      ...prev,
      image: str,
    }));
  }, []);

  const onCancelHandler = () => {
    dispatch(setEditedId(null));
  };

  const onEditHandler = () => {
    dispatch(onConfirmEditProduct(productForm));
    setProductForm("");
  };

  useEffect(() => {
    setValidForm((prev) => ({
      id: true,
      image: true,
      name: productForm?.name?.trim() ? true : false,
      billingAddress: productForm?.billing?.trim() ? true : false,
      mobileNo: productForm?.mobile?.trim() ? true : false,
    }));
  }, [productForm]);

  useEffect(() => {
    if (editedID !== null) {
      const isFindIndex = allProduct.findIndex((pd) => pd.id === editedID);
      if (isFindIndex !== -1) {
        setProductForm({ ...allProduct[isFindIndex] });
      }
    }
  }, [allProduct, editedID]);

  return editedID !== null ? (
    <div>
      <div className="relative">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Edited Product Form
                    </h3>
                    <div className="mt-2">
                      {/*  */}
                      <div className="bg-white rounded-xl mt-4">
                        <div className="flex mt-2">
                          <ImageUploader
                            keyName="QuickEditImageUpload"
                            className={imageUploadClasses}
                            url={productForm.image}
                            onChangeImage={onChangeImage}
                          />

                          <div className="flex-1 pl-3">
                            <div>
                              <input
                                autoComplete="nope"
                                value={productForm.productID}
                                placeholder="Product ID"
                                className={defaultInputLargeStyle}
                                onChange={(e) =>
                                  handlerProductValue(e, "productID")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                            Product Name
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Product Name"
                                type="text"
                                className={defaultInputStyle}
                                value={productForm.name}
                                onChange={(e) => handlerProductValue(e, "name")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                            Product Price
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Product Price"
                                type="text"
                                className={defaultInputStyle}
                                value={productForm.price}
                                onChange={(e) =>
                                  handlerProductValue(e, "price")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                            Product Amount
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Amount"
                                type="number"
                                className={defaultInputStyle}
                                value={productForm.amount}
                                onChange={(e) =>
                                  handlerProductValue(e, "amount")
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onEditHandler}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onCancelHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductEditModal;
