import React, { createContext, useReducer } from "react";
import {
  ORDER_SET_TYPE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from "./Constants/constants";

export const Store = createContext();

const initialState = {
  categoryList: { loading: true },
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

    default:
      return state;
  }
};
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(value);
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
