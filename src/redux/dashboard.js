import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: true,
  company: [],
};

export const dashboard = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    setCurrentTab: (state, { payload }) => {
      state.currentTab = !state.currentTab;
    },
    addCompany: (state, { payload }) => {
      console.log(payload);
      state.company.push(payload);
    },
  },
});

export const { setCurrentTab,addCompany } = dashboard.actions;

export default dashboard.reducer;
