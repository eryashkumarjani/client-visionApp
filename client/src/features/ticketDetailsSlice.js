import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//read action
export const getAllTickets = createAsyncThunk(
  "getAllTickets",
  async () => {
    try {
      const response = await axios.get("https://visionapp-backend.onrender.com/api/v1/ticket/all-tickets");
      // const response = await axios.get("http://localhost:8080/api/v1/ticket/all-tickets");
      console.log("#Response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//create action
export const addTicket = createAsyncThunk(
  "addTicket",
  async (formData) => {
    console.log("**************API O DATA**************", formData);
    try {
      const response = await axios.post("https://visionapp-backend.onrender.com/api/v1/ticket/add-ticket", formData);
      // const response = await axios.post("http://localhost:8080/api/v1/ticket/add-ticket", formData);
      console.log("**************API I DATA**************", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ticketDetailsSlice = createSlice({
  name: "ticketDetailsSlice",
  initialState: {
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getAllTickets.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    })
    builder.addCase(getAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(addTicket.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(addTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    })
    builder.addCase(addTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }

});

export default ticketDetailsSlice.reducer;