import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.some((item) => item._id === action.payload._id)
        ? state
        : [...state, { ...action.payload, isAdded: true, addedQty: 1 }];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);
    case "INCREASE_QTY":
      return state.map((item) =>
        item._id === action.payload
          ? { ...item, addedQty: item.addedQty + 1 }
          : item
      );
    case "DECREASE_QTY":
      return state.map((item) =>
        item._id === action.payload && item.addedQty > 1
          ? { ...item, addedQty: item.addedQty - 1 }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const existingCart = localStorage.getItem("cart");
    return existingCart ? JSON.parse(existingCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const increaseQty = (productId) => {
    dispatch({ type: "INCREASE_QTY", payload: productId });
  };

  const decreaseQty = (productId) => {
    dispatch({ type: "DECREASE_QTY", payload: productId });
  };

  const cartSubTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.addedQty, 0);
    return subtotal;
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, increaseQty, decreaseQty, cartSubTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
