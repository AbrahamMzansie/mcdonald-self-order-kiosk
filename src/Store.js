import React, { createContext, useReducer } from "react";
import {
  ORDER_SET_TYPE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
} from "./Constants/constants";

export const Store = createContext();

const initialState = {
  categoryList: { loading: true },
  productList : {loading: true},
  order: {
    orderType: "Eat In",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_SET_TYPE:
      const newState = {
        ...state,
        order: { ...state.order, orderType: action.payload },
      };
      return newState;

    case CATEGORY_LIST_REQUEST:
      return { ...state, categoryList: { loading: true } };

    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: { loading: false, categories: action.payload },
      };

    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        categoryList: { loading: false, error: action.payload },
      };

      case PRODUCTS_LIST_REQUEST:
      return { ...state, productList: { loading: true } };

    case PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        productList: { loading: false, products: action.payload },
      };

    case PRODUCTS_LIST_FAIL:
      return {
        ...state,
        productList: { loading: false, error: action.payload },
      };

    default:
      return state;
  }
};
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
 
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
