import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//read action
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async () => {
    try {
      const response = await axios.get("https://visionapp-backend.onrender.com/api/v1/product/all-products");
      // const response = await axios.get("http://localhost:8080/api/v1/product/all-products");
      console.log("#Response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//create action
export const addProduct = createAsyncThunk(
  "addProduct",
  async (formData) => {
    console.log("**************API O DATA**************", formData);
    try {
      const response = await axios.post("https://visionapp-backend.onrender.com/api/v1/product/add-product", formData);
      // const response = await axios.post("http://localhost:8080/api/v1/product/add-product", formData);
      console.log("**************API I DATA**************", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productDetailsSlice = createSlice({
  name: "productDetailsSlice",
  initialState: {
    products: [],
    allCart: localStorage.getItem("allCart")
      ? JSON.parse(localStorage.getItem("allCart"))
      : [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      let check = state.allCart.findIndex((item) => item._id === action.payload._id);
      if (check >= 0) {
        state.allCart[check].productQuantity += 1;
      } else {
        state.allCart.push(action.payload);
      }
      localStorage.setItem("allCart", JSON.stringify(state.allCart));
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.allCart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { productPrice, productQuantity } = cartItem;
          console.log(productPrice, productQuantity);
          const itemTotal = productPrice * productQuantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += productQuantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
      localStorage.setItem("allCart", JSON.stringify(state.allCart));

    },

    removeItem: (state, action) => {
      state.allCart = state.allCart.filter((item) => item._id !== action.payload);
      localStorage.setItem("allCart", JSON.stringify(state.allCart));

    },

    increaseItemQuantity: (state, action) => {
      state.allCart = state.allCart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, productQuantity: item.productQuantity + 1 };
        }
        return item;
      });
      localStorage.setItem("allCart", JSON.stringify(state.allCart));

    },
    decreaseItemQuantity: (state, action) => {
      state.allCart = state.allCart.map((item) => {
        if (item._id === action.payload && item.productQuantity !== 1) {
          return { ...item, productQuantity: item.productQuantity - 1 };
        }
        return item;
      });
      localStorage.setItem("allCart", JSON.stringify(state.allCart));

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  }

});

export const { addToCart, getCartTotal, removeItem, increaseItemQuantity, decreaseItemQuantity } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;