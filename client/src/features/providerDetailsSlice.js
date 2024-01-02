import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//read action
export const getAllProviders = createAsyncThunk(
  "getAllProviders",
  async () => {
    try {
      const response = await axios.get("https://visionapp-backend.onrender.com/api/v1/provider/all-providers");
      // const response = await axios.get("http://localhost:8080/api/v1/provider/all-providers");
      console.log("#Response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//create action
export const addProvider = createAsyncThunk(
  "addProvider",
  async (formData) => {
    console.log("**************API O DATA**************", formData);
    try {
      const response = await axios.post("https://visionapp-backend.onrender.com/api/v1/provider/add-provider", formData);
      // const response = await axios.post("http://localhost:8080/api/v1/provider/add-provider", formData);
      console.log("**************API I DATA**************", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const providerDetailsSlice = createSlice({
  name: "providerDetails",
  initialState: {
    providers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getAllProviders.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllProviders.fulfilled, (state, action) => {
      state.loading = false;
      state.providers = action.payload;
    })
    builder.addCase(getAllProviders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(addProvider.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(addProvider.fulfilled, (state, action) => {
      state.loading = false;
      state.providers = action.payload;
    })
    builder.addCase(addProvider.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }

});

export default providerDetailsSlice.reducer;