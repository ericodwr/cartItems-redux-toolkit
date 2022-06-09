import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== itemId,
      );
    },
    toggleItem: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (payload.toggle === 'increase') {
        cartItem.amount = cartItem.amount + 1;
      } else if (payload.toggle === 'decrease') {
        cartItem.amount = cartItem.amount - 1;
      }

      if (cartItem.amount < 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== cartItem.id,
        );
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.map((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, toggleItem, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
