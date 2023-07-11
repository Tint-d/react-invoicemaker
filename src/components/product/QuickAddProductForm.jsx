import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiFillFileImage } from "react-icons/ai";
import ImageUploader from "../common/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  addProduct,
  updateNewProductFormField,
} from "../../redux/productSlice";
import {
  defaultInputInvalidStyle,
  defaultInputLargeInvalidStyle,
  defaultInputLargeStyle,
  defaultInputStyle,
} from "../constants/defaultStyle";
import Button from "../Button/Button";
import { nanoid } from "@reduxjs/toolkit";
import ProductEditModal from "./ProductEditModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emptyForm = {
  id: "",
  image: "",
  productID: "",
  name: "",
  amount: 0,
  price: 0,
};

const QuickAddProductForm = () => {
  const [productForm, setProductForm] = useState(emptyForm);
  const [isTouched, setIsTouched] = useState(false);
  const [validForm, setValidForm] = useState(
    Object.keys(emptyForm).reduce((a, b) => {
      return { ...a, [b]: false };
    }, {})
  );
  const productNewForm = useSelector((state) => state.Product.newForm);
  const dispatch = useDispatch();

  const onChangeImage = useCallback((str) => {
    setProductForm((prev) => ({
      ...prev,
      image: str,
    }));
  }, []);

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

    dispatch(addNewProduct({ ...productForm, id: nanoid() }));
    setIsTouched(false);
    console.log("submit");
  }, [productForm, dispatch, validForm]);

  useEffect(() => {
    setValidForm((prev) => ({
      id: true,
      image: true,
      name: productForm?.name?.trim() ? true : false,
      productID: productForm?.productID?.trim() ? true : false,
      price: productForm?.price <= 0 ? false : true,
      amount: productForm.amount <= 0 ? false : true,
    }));
  }, [productForm]);

  useEffect(() => {
    if (productNewForm) {
      setProductForm(productNewForm);
    }
  }, [productNewForm]);

  return (
    <div className="bg-white rounded-xl p-4">
      <h3> Quick Add Product </h3>
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
              placeholder="Product ID"
              className={
                !validForm.productID && isTouched
                  ? defaultInputLargeInvalidStyle
                  : defaultInputLargeStyle
              }
              value={productForm.productID}
              onChange={(e) => handlerProductValue(e, "productID")}
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
              className={
                !validForm.name && isTouched
                  ? defaultInputInvalidStyle
                  : defaultInputStyle
              }
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
              className={
                !validForm.price && isTouched
                  ? defaultInputInvalidStyle
                  : defaultInputStyle
              }
              value={productForm.price}
              onChange={(e) => handlerProductValue(e, "price")}
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
              className={
                !validForm.amount && isTouched
                  ? defaultInputInvalidStyle
                  : defaultInputStyle
              }
              // disabled={isInitLoading}
              value={productForm.amount}
              onChange={(e) => handlerProductValue(e, "amount")}
            />
          </div>
        </div>
      </div>
      <div onClick={submitHandler} className="mt-3">
        <Button block="true">
          <span className="inline-block ml-2 "> Submit </span>
        </Button>
      </div>
      {/* <ProductEditModal/> */}
      <ToastContainer />
    </div>
  );
};

export default QuickAddProductForm;
