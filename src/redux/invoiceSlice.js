import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: [],
  existingProduct: [],
  data: [],
  newForm: {
    id: nanoid(),
    productID: "",
    image: "",
    name: "",
    amount: 0,
    price: 0,
  },
  totalPrice: 0,

  selectModalID: null,
  deletedID: null,
  modalToggle: false,
  tax: [],
  extraFee: [],
  clientInfo: [],
  clientForm: {
    id: nanoid(),
    name: "",
    address: "",
    mobile: "",
    email: "",
    invoiceNumber: "",
    createDate: new Date().toLocaleDateString(),
    dueDate: new Date().toLocaleDateString(),
    total: 0,
    statusName: "",
    subTotal: 0,
    product: [],
    tax: [],
    extraFee: [],
  },
  total: 0,
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    addNewProductInvoice: (state, action) => {
      const newDatas = [...state.data, action.payload];
      state.data = newDatas;

      const reNewForm = {
        id: nanoid(),
        image: "",
        productID: "",
        name: "",
        amount: 0,
        price: 0,
      };

      state.newForm = { ...reNewForm };
    },
    updateProduct: (state, action) => {
      const { id, field, value } = action.payload;
      const product = state.data.find((item) => item.id === id);
      if (product) {
        product[field] = value;
      }
    },
    setModalToggle: (state, { payload }) => {
      state.modalToggle = payload;
    },
    setSelectModalID: (state, { payload }) => {
      state.selectModalID = payload;
    },
    setAddExistingPriduct: (state, { payload }) => {
      const existed = state.existingProduct.find((pd) => pd.id === payload.id);
      if (existed) {
        return state;
      } else {
        state.existingProduct.push(payload);
      }
      // console.log(payload);
    },
    setExistingUpdateProduct: (state, { payload }) => {
      const { id, field, value } = payload;
      const product = state.existingProduct.find((item) => item.id === id);
      if (product) {
        product[field] = value;
      }
    },
    removeExistingProduct: (state, { payload }) => {
      state.existingProduct = state.existingProduct.filter(
        (item) => item.id !== payload
      );
    },
    setTax: (state, { payload }) => {
      const existed = state.tax.find((pd) => pd.id === payload.id);
      if (existed) {
        return state;
      } else {
        state.tax.push(payload);
      }
    },
    setTaxUpdate: (state, { payload }) => {
      const { id, field, value } = payload;
      // console.log(payload);
      const product = state.tax.find((item) => item.id === id);
      if (product) {
        product[field] = value;
      }
    },
    setTaxRemove: (state, { payload }) => {
      state.tax = state.tax.filter((item) => item.id !== payload);
    },
    setExtraFee: (state, { payload }) => {
      state.extraFee.push(payload);
    },
    setExtraFeeUpdate: (state, { payload }) => {
      const { id, field, value } = payload;
      const product = state.extraFee.find((item) => item.id === id);
      if (product) {
        product[field] = value;
      }
    },
    setExtraFeeRemove: (state, { payload }) => {
      state.extraFee = state.extraFee.filter((item) => item.id !== payload);
    },
    setClientInfo: (state, { payload }) => {
      const newDatas = [...state.clientInfo, payload];
      state.clientInfo = newDatas;

      const reNewForm = {
        id: nanoid(),
        name: "",
        address: "",
        mobile: "",
        email: "",
        invoiceNumber: "",
        createDate: "",
        dueDate: "",
        total: 0,
        statusName: "",
      };

      state.clientForm = { ...reNewForm };
    },
    setClientInfoUpdate: (state, { payload }) => {
      state.clientForm[payload.key] = payload.value;
    },
    setClientInfoRemove: (state, { payload }) => {
      state.clientInfo = state.clientInfo.filter((item) => item.id !== payload);
    },
    setTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  addNewProductInvoice,
  setModalToggle,
  setSelectModalID,
  setAddExistingPriduct,
  setExistingUpdateProduct,
  removeExistingProduct,
  setTax,
  setTaxUpdate,
  setTaxRemove,
  setExtraFee,
  setExtraFeeUpdate,
  setExtraFeeRemove,
  setClientInfoUpdate,
  setClientInfo,
  setClientInfoRemove,
  setTotal,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
