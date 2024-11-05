import { configureStore } from "@reduxjs/toolkit";
import reqFormReducer from "../features/requestForm";

export const store = configureStore({
  reducer: {
    requestForm: reqFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
