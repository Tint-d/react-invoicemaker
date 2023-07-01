import { nanoid } from "@reduxjs/toolkit";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../common/ImageUploader";
import { useState } from "react";
import {
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import client, { onConfirmEditClient, setClientEditId } from "../../redux/client";

const emptyForm = {
  id: nanoid(),
  image: "",
  name: "",
  mobile: "",
  email: "",
  billing: "",
};

const ClientModal = () => {
  const editedID = useSelector((state) => state.Client.editedID);
  const allClient = useSelector((state) => state.Client.data);
  // console.log(allClient);
  // console.log(editedID);
  const [productForm, setProductForm] = useState(emptyForm);
  const dispatch = useDispatch();

  const item = allClient.find((client) => client.id === editedID);

  const handlerProductValue = useCallback(
    (event, keyName) => {
      const value = event.target.value;

      setProductForm((prev) => {
        return { ...prev, [keyName]: value };
      });

      // dispatch(updateNewProductFormField({ key: keyName, value }));
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
    dispatch(setClientEditId(null));
  };

  const onEditHandler = () => {
    dispatch(onConfirmEditClient(productForm));
    setProductForm("");
  };

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
                            url={productForm.image || item.image}
                            onChangeImage={onChangeImage}
                          />

                          <div className="flex-1 pl-3">
                            <div>
                              <input
                                autoComplete="nope"
                                placeholder="User Name"
                                className={defaultInputLargeStyle}
                                defaultValue={item.name || productForm.name}
                                onChange={(e) => handlerProductValue(e, "name")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                            Email
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="User Email"
                                type="text"
                                className={defaultInputStyle}
                                defaultValue={item.email || productForm.email}
                                onChange={(e) =>
                                  handlerProductValue(e, "email")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                            Phone Number
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Phone Number"
                                type="text"
                                className={defaultInputStyle}
                                defaultValue={item.mobile || productForm.mobile}
                                onChange={(e) =>
                                  handlerProductValue(e, "mobile")
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="font-title text-sm text-default-color">
                            Billing
                          </div>
                          <div className="flex">
                            <div className="flex-1">
                              <input
                                autoComplete="nope"
                                placeholder="Billing"
                                type="text"
                                className={defaultInputStyle}
                                defaultValue={
                                  item.billing || productForm.billing
                                }
                                onChange={(e) =>
                                  handlerProductValue(e, "billing")
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

export default ClientModal;
