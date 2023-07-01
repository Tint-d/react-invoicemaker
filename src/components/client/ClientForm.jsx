import React, { useCallback, useMemo, useState } from "react";
import Button from "../Button/Button";
import ImageUploader from "../common/ImageUploader";
import {
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import { useDispatch } from "react-redux";
import { addNewClient } from "../../redux/client";
import { nanoid } from "@reduxjs/toolkit";

const emptyForm = {
  id: nanoid(),
  image: "",
  name: "",
  mobile: "",
  email: "",
  billing: "",
};

const ClientForm = () => {
  const [clientForm, setClientForm] = useState(emptyForm);
  const dispatch = useDispatch();

  const onChangeImage = useCallback((str) => {
    setClientForm((prev) => ({
      ...prev,
      image: str,
    }));
  }, []);

  const handlerProductValue = useCallback(
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

  const submitHandler = () => {
    dispatch(addNewClient({ ...clientForm, id: nanoid() }));
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className=" text-blue-500 font-semibold text-lg"> Quick Add Product </h3>
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
              className={defaultInputLargeStyle}
              value={clientForm.productID}
              onChange={(e) => handlerProductValue(e, "name")}
              // disabled={isInitLoading}
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
              placeholder="Email Address"
              type="email"
              className={defaultInputStyle}
              // disabled={isInitLoading}
              value={clientForm.email}
              onChange={(e) => handlerProductValue(e, "email")}
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
              className={defaultInputStyle}
              // disabled={isInitLoading}
              value={clientForm.price}
              onChange={(e) => handlerProductValue(e, "mobile")}
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
              // disabled={isInitLoading}
              value={clientForm.billing}
              onChange={(e) => handlerProductValue(e, "billing")}
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
    </div>
  );
};

export default ClientForm;
