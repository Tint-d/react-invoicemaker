import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../Button/Button";
import ImageUploader from "../common/ImageUploader";
import {
  defaultInputInvalidStyle,
  defaultInputLargeInvalidStyle,
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import { useDispatch, useSelector } from "react-redux";
import { addNewClient } from "../../redux/client";
import { nanoid } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emptyForm = {
  id: "",
  image: "",
  name: "",
  mobile: "",
  email: "",
  billing: "",
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ClientForm = () => {
  const clientNewForm = useSelector((state) => state.Client.newForm);
  const [clientForm, setClientForm] = useState(emptyForm);
  const [isTouched, setIsTouched] = useState(false);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );
  const dispatch = useDispatch();

  const onChangeImage = useCallback((str) => {
    setClientForm((prev) => ({
      ...prev,
      image: str,
    }));
  }, []);

  const handlerClientValue = useCallback(
    (event, keyName) => {
      const value = event.target.value;

      setClientForm((prev) => {
        return { ...prev, [keyName]: value };
      });

      // dispatch(updateNewProductFormField({ key: keyName, value }));
    },
    [dispatch]
  );

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

  const submitHandler = useCallback(() => {
    setIsTouched(true);

    const isValid = Object.keys(validForm).every((key) => validForm[key]);

    if (!isValid) {
      toast.error("Invalid Client Form !", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
      return;
    }

    toast.success("Wow so easy to Update!", {
      position: "bottom-center",
      autoClose: 2000,
    });

    dispatch(addNewClient({ ...clientForm, id: nanoid() }));
    setIsTouched(false);
  }, [clientForm, dispatch, validForm]);

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
    if (clientNewForm) {
      setClientForm(clientNewForm);
    }
  }, [clientNewForm]);
  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className=" text-blue-500 font-semibold text-lg">
        {" "}
        Quick Add Client{" "}
      </h3>
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
              placeholder="Client Name"
              className={
                !validForm.name && isTouched
                  ? defaultInputLargeInvalidStyle
                  : defaultInputLargeStyle
              }
              value={clientForm.name}
              onChange={(e) => handlerClientValue(e, "name")}
              // disabled={isInitLoading}
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-title text-sm text-default-color">Email</div>
        <div className="flex">
          <div className="flex-1">
            <input
              autoComplete="nope"
              placeholder="Email Address"
              type="email"
              className={
                !validForm.email && isTouched
                  ? defaultInputInvalidStyle
                  : defaultInputStyle
              }
              // disabled={isInitLoading}
              value={clientForm.email}
              onChange={(e) => handlerClientValue(e, "email")}
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-title text-sm text-default-color">
          Mobile Number
        </div>
        <div className="flex">
          <div className="flex-1">
            <input
              autoComplete="nope"
              placeholder="Mobile Number"
              type="text"
              className={
                !validForm.mobileNo && isTouched
                  ? defaultInputInvalidStyle
                  : defaultInputStyle
              }
              // disabled={isInitLoading}
              value={clientForm.mobile}
              onChange={(e) => handlerClientValue(e, "mobile")}
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-title text-sm text-default-color">Billing</div>
        <div className="flex">
          <div className="flex-1">
            <input
              autoComplete="nope"
              placeholder="Billing"
              type="text"
              className={
                !validForm.billingAddress && isTouched
                  ? defaultInputInvalidStyle
                  : defaultInputStyle
              }
              // disabled={isInitLoading}
              value={clientForm.billing}
              onChange={(e) => handlerClientValue(e, "billing")}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Button block="true" onClick={submitHandler}>
          <span className="inline-block ml-2 "> Submit </span>
        </Button>
      </div>
      {/* <ProductEditModal/> */}
      <ToastContainer />
    </div>
  );
};

export default ClientForm;
