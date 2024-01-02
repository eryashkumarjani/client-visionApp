import { configureStore } from "@reduxjs/toolkit";
import postDetailsSlice from "../features/postDetailsSlice";
import providerDetailsSlice from "../features/providerDetailsSlice";
import productDetailsSlice from "../features/productDetailsSlice";
import ticketDetailsSlice from "../features/ticketDetailsSlice";

const store = configureStore({
  reducer: {
    post: postDetailsSlice,
    provider: providerDetailsSlice,
    product: productDetailsSlice,
    ticket: ticketDetailsSlice
  },
});

export default store;