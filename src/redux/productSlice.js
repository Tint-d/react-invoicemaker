import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
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

  editedID: null,
  deletedID: null,
};

export const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.product = state.product.filter(
        (item) => item.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const { id, field, value } = action.payload;
      const product = state.product.find((item) => item.id === id);
      if (product) {
        product[field] = value;
      }
    },

    editProduct: (state, { payload }) => {
      state.newForm = { ...payload };
      //  console.log();
      // state.product = {...state.newForm}
    },
    updateNewProductFormField: (state, action) => {
      state.newForm[action.payload.key] = action.payload.value;
    },
    addNewProduct: (state, action) => {
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
    setDeleteId: (state, { payload }) => {
      state.data = state.data.filter(pd => pd.id !== payload);
    },

    setEditedId: (state, { payload }) => {
      state.editedID = payload;
    },

    onConfirmEditProduct: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (product) => product.id === state.editedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      state.editedID = null;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  editProduct,
  updateNewProductFormField,
  addNewProduct,
  setDeleteId,
  setEditedId,
  onConfirmEditProduct,
} = productSlice.actions;

export default productSlice.reducer;

export const getAllProductSelector = (state) => state.Product.data;
