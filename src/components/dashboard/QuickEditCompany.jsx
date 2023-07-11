import React, { useCallback, useMemo, useState } from "react";
import {
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import ImageUploader from "../common/ImageUploader";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addCompany } from "../../redux/dashboard";

const emptyForm = {
  id: nanoid(),
  image: "",
  name: "",
  mobile: "",
  email: "",
  address: "",
};

const QuickEditCompany = () => {
  const [companyForm, setCompanyForm] = useState(emptyForm);
  const company = useSelector(state => state.Dashboard.company)
  const dispatch = useDispatch();

  const onChangeImage = useCallback((str) => {
    setCompanyForm((prev) => ({
      ...prev,
      image: str,
    }));
  }, []);

  const handlerProductValue = useCallback(
    (event, keyName) => {
      const value = event.target.value;

      setCompanyForm((prev) => {
        return { ...prev, [keyName]: value };
      });

      // dispatch(updateNewProductFormField({ key: keyName, value }));
    },
    [dispatch]
  );

  const imageUploadClasses = useMemo(() => {
    const defaultStyle = "rounded-xl ";

    if (companyForm.image) {
      return defaultStyle + " ";
    }

    if (!companyForm.image) {
      return defaultStyle + " border-dashed border-2 border-indigo-400 ";
    }

    return defaultStyle;
  }, [companyForm]);

  const submitHandler = () => {
    dispatch(addCompany({ ...companyForm, id: nanoid() }));
  };
  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className=" text-blue-500 font-semibold text-lg">
        {" "}
        Quick Add Company{" "}
      </h3>
      <div className="flex mt-2">
        <ImageUploader
          keyName="QuickEditImageUpload"
          className={imageUploadClasses}
          url={companyForm.image}
          onChangeImage={onChangeImage}
        />

        <div className="flex-1 pl-3">
          <div>
            <input
              autoComplete="nope"
              placeholder="Company Name"
              className={defaultInputLargeStyle}
              defaultValue={companyForm.productID}
              onChange={(e) => handlerProductValue(e, "name")}
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-title text-sm text-default-color">
          Company Address
        </div>
        <div className="flex">
          <div className="flex-1">
            <input
              autoComplete="nope"
              placeholder="Company Address"
              type="text"
              className={defaultInputStyle}
              // disabled={isInitLoading}
              defaultValue={companyForm.address}
              onChange={(e) => handlerProductValue(e, "address")}
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-title text-sm text-default-color">
          Company Email
        </div>
        <div className="flex">
          <div className="flex-1">
            <input
              autoComplete="nope"
              placeholder="Company Email"
              type="email"
              className={defaultInputStyle}
              // disabled={isInitLoading}
              defaultValue={companyForm.email}
              onChange={(e) => handlerProductValue(e, "email")}
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-title text-sm text-default-color">
          Company Phone
        </div>
        <div className="flex" >
          <div className="flex-1">
            <input
              autoComplete="nope"
              placeholder="Company Phone"
              type="text"
              className={defaultInputStyle}
              // disabled={isInitLoading}
              defaultValue={companyForm.mobile}
              onChange={(e) => handlerProductValue(e, "mobile")}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Button block={1} onClick={submitHandler}>
          <span className="inline-block ml-2 "> Submit </span>
        </Button>
      </div>
      {/* <ProductEditModal/> */}
    </div>
  );
};

export default QuickEditCompany;
