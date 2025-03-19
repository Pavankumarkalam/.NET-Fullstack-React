// src/components/CartDisplay.js

import React, { useContext, useCallback } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * CartDisplay renders the list of cart items and provides
 * controls to add a new item, remove individual items, or clear the cart.
 */
const CartDisplay = () => {
  const { cartState, cartDispatch } = useContext(CartContext);

  // Add a new item to the cart
  const addItem = useCallback(() => {
    const newItem = {
      id: Date.now(),
      name: `Item ${cartState.length + 1}`
    };
    cartDispatch({ type: 'ADD_ITEM', payload: newItem });
  }, [cartState, cartDispatch]);

  // Remove an item from the cart by its ID
  const removeItem = useCallback(
    (id) => {
      cartDispatch({ type: 'REMOVE_ITEM', payload: id });
    },
    [cartDispatch]
  );

  // Clear all cart items
  const clearCart = useCallback(() => {
    cartDispatch({ type: 'CLEAR_CART' });
  }, [cartDispatch]);

  return (
    <div>
      <h2>Your Cart</h2>
      <button onClick={addItem}>Add Item</button>
      <button onClick={clearCart} style={{ marginLeft: '10px' }}>
        Clear Cart
      </button>
      <ul>
        {cartState.map((item) => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => removeItem(item.id)} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total items: {cartState.length}</p>
    </div>
  );
};

export default React.memo(CartDisplay);
