import { loginFailure,loginStart,loginSuccess } from "./userRedux";

import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
  } from "./productRedux";
import axios from "axios";
import { publicRequest } from "./requestMethod";

  export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", user);
      dispatch(loginSuccess(res.data));
      console.log(res.data);
  
      // Check if the logged-in user is an admin
     
  
    } catch (err) {
      dispatch(loginFailure());
      return false; // Return a flag or value indicating login failure
    }
  };
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await publicRequest.get("/products/getpost");
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };
  export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
       const res = await  publicRequest.delete(`/products/${id}`);
      dispatch(deleteProductSuccess(res.data));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
  export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // update
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await publicRequest.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };
