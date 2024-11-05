import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ReqFormState, ReqFormData } from "../types/request-form";

const initialState: ReqFormState = {
  data: {
    fullName: "",
    email: "",
    issueType: "",
    tags: [],
    steps: [],
  },
};

export const reqFormData = createSlice({
  name: "reqFormData",
  initialState,
  reducers: {
    setReqFormData: (state, action: PayloadAction<ReqFormData>) => {
      state.data = action.payload;
    },
  },
});

export const { setReqFormData } = reqFormData.actions;

export default reqFormData.reducer;
