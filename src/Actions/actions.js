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
} from "../Constants/constants";
import axios from "axios";
export const setOrderType = (dispatch, orderType) => {
  return dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};

export const listCagories = async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/categories");
    return dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    return dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listProducts = async (dispatch , categoryName = "") => {
  dispatch({ type: PRODUCTS_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/products?category=${categoryName}`);
    return dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data.products });
  } catch (error) {
   
    return dispatch({ type: PRODUCTS_LIST_FAIL, payload: error.message });
  }
};
export const addToOrder = async (dispatch , item)=>{
  return dispatch({
    type : ORDER_ADD_ITEM,
    payload : item
  })
}

export const removerFromOrder = async (dispatch , item)=>{
  return dispatch({
    type : ORDER_REMOVE_ITEM,
    payload : item
  })
}

export const clearOrder = async (dispatch)=>{
  return dispatch({
    type : ORDER_CLEAR,
  })
}
