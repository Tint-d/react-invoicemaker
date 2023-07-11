import { nanoid } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../common/ImageUploader";
import { useState } from "react";
import {
  defaultInputInvalidStyle,
  defaultInputLargeInvalidStyle,
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import client, {
  onConfirmEditClient,
  setClientEditId,
} from "../../redux/client";

const emptyForm = {
  id: "",
  image: "",
  name: "",
  mobile: "",
  email: "",
  billing: "",
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ClientModal = () => {
  const editedID = useSelector((state) => state.Client.editedID);
  const allClient = useSelector((state) => state.Client.data);
  const [animate, setAnimate] = useState(true);
  const [clientForm, setClientForm] = useState(emptyForm);
  const [isTouched, setIsTouched] = useState(false);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );
  const dispatch = useDispatch();

  const handlerClientValue = useCallback((event, keyName) => {
    const value = event.target.value;

    setClientForm((prev) => {
      return { ...prev, [keyName]: value };
    });
  }, []);

  const imageUploadClasses = useMemo(() => {
    const defaultStyle = "rounded-xl ";

    if (clientForm.image) {
      return defaultStyle + " ";
    }

    if (!clientForm.image) {
      return defaultStyle + " border-dashed border-2 border-indigo-400 ";
    }

    return defaultStyle;
  }, [clientForm]);

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
    dispatch(onConfirmEditClient(clientForm));
    setClientForm("");
  };

  useEffect(() => {
    const isValidEmail =
      clientForm?.email?.trim() && clientForm?.email.match(emailRegex);

    setValidForm((prev) => ({
      id: true,
      image: true,
      name: clientForm?.name?.trim() ? true : false,
      email: isValidEmail ? true : false,
      billingAddress: clientForm?.billing?.trim() ? true : false,
      mobileNo: clientForm?.mobile?.trim() ? true : false,
    }));
  }, [clientForm]);

  useEffect(() => {
    if (editedID !== null) {
      setAnimate(true);
      const isFindIndex = allClient.findIndex(
        (client) => client.id === editedID
      );
      if (isFindIndex !== -1) {
        setClientForm({ ...allClient[isFindIndex] });
      }
    } else {
      setAnimate(false);
    }
  }, [allClient, editedID]);

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
                            url={clientForm.image}
                            onChangeImage={onChangeImage}
                          />

                          <div className="flex-1 pl-3">
                            <div>
                              <input
                                autoComplete="nope"
                                placeholder="User Name"
                                className={
                                  !validForm.name && isTouched
                                    ? defaultInputLargeInvalidStyle
                                    : defaultInputLargeStyle
                                }
                                value={clientForm.name}
                                onChange={(e) => handlerClientValue(e, "name")}
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
                                className={
                                  !validForm.email && isTouched
                                    ? defaultInputInvalidStyle
                                    : defaultInputStyle
                                }
                                value={clientForm.email}
                                onChange={(e) => handlerClientValue(e, "email")}
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
                                className={
                                  !validForm.mobile && isTouched
                                    ? defaultInputInvalidStyle
                                    : defaultInputStyle
                                }
                                value={clientForm.mobile}
                                onChange={(e) =>
                                  handlerClientValue(e, "mobile")
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
                                className={
                                  !validForm.billing && isTouched
                                    ? defaultInputInvalidStyle
                                    : defaultInputStyle
                                }
                                value={clientForm.billing}
                                onChange={(e) =>
                                  handlerClientValue(e, "billing")
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
