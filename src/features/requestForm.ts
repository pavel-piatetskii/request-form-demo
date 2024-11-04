import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ReqFormState {
  fullName: string;
  email: string;
  issueType: string;
  tags: string[]; // "ui" | "backend" | "performance" | "minor" | "major" | "critical"
  steps: string[];
}

const initialState: ReqFormState = {
  fullName: "",
  email: "",
  issueType: "",
  tags: [],
  steps: [],
};

export const counterSlice = createSlice({
  name: "reqFormData",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIssueType: (state, action: PayloadAction<string>) => {
      state.issueType = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.tags = [...state.tags, action.payload];
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((t) => t !== action.payload);
    },
    addStep: (state, action: PayloadAction<string>) => {
      state.steps = [...state.steps, action.payload];
    },
    removeStep: (state, action: PayloadAction<string>) => {
      const index = Number(action.payload);
      if (isNaN(index)) {
        state.steps = [...state.steps].splice(index, 1);
      } else {
        state.steps = [...state.steps];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setName,
  setEmail,
  setIssueType,
  addTag,
  removeTag,
  addStep,
  removeStep,
} = counterSlice.actions;

export default counterSlice.reducer;
