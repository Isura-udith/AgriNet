// cartContext.jsx
import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...state,
        { ...action.payload, quantity: 1, selected: false }, // Initialize selected as false
      ];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "INCREMENT_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREMENT_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case "CLEAR_CART":
      return [];
    case "TOGGLE_SELECT_ITEM":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, selected: !item.selected }
          : item
      );
    case "TOGGLE_SELECT_ALL": {
      const areAllSelected = state.every((item) => item.selected);
      return state.map((item) => ({
        ...item,
        selected: !areAllSelected,
      }));
    }
    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);

export default CartContext;
