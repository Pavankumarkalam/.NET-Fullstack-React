// src/context/CartContext.js

import React, { createContext, useReducer, useEffect } from 'react';

// Create a context for the cart
export const CartContext = createContext();

/**
 * Reducer function for cart state.
 * Supported actions: ADD_ITEM, REMOVE_ITEM, CLEAR_CART.
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

/**
 * CartProvider wraps its children and provides cart state using useReducer.
 * The cart is persisted in localStorage.
 */
const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCart);

  // Persist cart changes to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
