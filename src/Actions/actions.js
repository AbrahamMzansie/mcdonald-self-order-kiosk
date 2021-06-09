import {
  ORDER_SET_TYPE,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_CLEAR,
  ORDER_SET_PAYMENT_TYPE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../Constants/constants";
import axios from "axios";
export const setOrderType = (dispatch, orderType) => {
  dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};

export const listCagories = async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/categories");
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listProducts = async (dispatch, categoryName = "") => {
  dispatch({ type: PRODUCTS_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/products?category=${categoryName}`);
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: error.message });
  }
};
export const addToOrder = async (dispatch, item) => {
  dispatch({
    type: ORDER_ADD_ITEM,
    payload: item,
  });
};

export const removerFromOrder = async (dispatch, item) => {
  dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: item,
  });
};

export const clearOrder = async (dispatch) => {
  dispatch({
    type: ORDER_CLEAR,
  });
};

export const setPaymentType = async (dispatch, paymentType) => {
  dispatch({
    type: ORDER_SET_PAYMENT_TYPE,
    payload: paymentType,
  });
};

export const createOrder = async (dispatch, order) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { data } = await axios.post("/api/orderCreate", order);
    console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: ORDER_CLEAR });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};
