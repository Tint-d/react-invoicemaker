import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  client: [],
  data: [],
  newForm: {
    id: nanoid(),
    image: "",
    name: "",
    mobile: "",
    email: "",
    billing: "",
  },
  editedID: null,
  deletedID: null,
  selectClientModalID: null,
  modalToggle: false,
  existingClient: [],
};

export const client = createSlice({
  name: "Client",
  initialState,
  reducers: {
    addClient: (state, { payload }) => {
      state.client.push(payload);
    },
    addNewClient: (state, action) => {
      const newDatas = [...state.data, action.payload];
      state.data = newDatas;

      const reNewForm = {
        id: nanoid(),
        image: "",
        name: "",
        mobile: "",
        email: "",
        billing: "",
      };

      state.newForm = { ...reNewForm };
    },
    setClientDeleteId: (state, { payload }) => {
      state.deletedID = payload;
    },

    setClientEditId: (state, { payload }) => {
      state.editedID = payload;
    },
    onConfirmEditClient: (state, action) => {
      const isFindIndex = state.data.findIndex(
        (product) => product.id === state.editedID
      );
      if (isFindIndex !== -1) {
        state.data[isFindIndex] = { ...action.payload };
      }
      state.editedID = null;
    },
    setRemoveClient: (state, { payload }) => {
      state.data = state.data.filter((pd) => pd.id !== payload);
    },
    setClientModalToggle: (state, { payload }) => {
      state.modalToggle = payload;
    },
    setSelectClientModalID: (state, { payload }) => {
      state.selectModalID = payload;
    },
    setAddExistClient: (state, { payload }) => {
      const existed = state.existingClient.find((pd) => pd.id === payload.id);
      console.log(payload);
      if (existed) {
        return state;
      } else {
        state.existingClient.push(payload);
      }
    },
  },
});

export const {
  addClient,
  addNewClient,
  setClientDeleteId,
  setClientEditId,
  onConfirmEditClient,
  setRemoveClient,
  setClientModalToggle,
  setAddExistClient,
  setSelectClientModalID,
} = client.actions;

export default client.reducer;
