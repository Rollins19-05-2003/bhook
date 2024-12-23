import { createSlice } from "@reduxjs/toolkit";
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : { items: [] };
};
const cartSlice = createSlice({
  name:"cart",
  initialState: loadCartFromLocalStorage(),
  reducers:{
    addItem:(state, action)=>{
        state.items.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action)=>{
      state.items = state.items.filter(item => item._id !== action.payload._id);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state)=>{
        state.items.length = 0; // []
        localStorage.removeItem("cart");
    },
  },
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;