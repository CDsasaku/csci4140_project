import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/item';
import { RootState } from './root_reducers';

interface ItemState {
  items: Item[];
  item: Item | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  item: null,
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {

    // get items
    getItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getItemsSuccess: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    getItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get item
    getItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getItemSuccess: (state, action: PayloadAction<Item>) => {
      state.item = action.payload;
      state.loading = false;
      state.error = null;
    },
    getItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // create item
    createItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createItemSuccess: (state, action: PayloadAction<Item>) => {
      state.item = action.payload;
      state.items.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update item
    updateItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateItemSuccess: (state, action: PayloadAction<Item>) => {
      state.item = action.payload;
      state.items = state.items.map((item) => item.id === action.payload.id ? action.payload : item);
      state.loading = false;
      state.error = null;
    },
    updateItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteItemStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteItemSuccess: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  getItemsStart,
  getItemsSuccess,
  getItemsFailure,
  getItemStart,
  getItemSuccess,
  getItemFailure,
  createItemStart,
  createItemSuccess,
  createItemFailure,
  updateItemStart,
  updateItemSuccess,
  updateItemFailure,
  deleteItemStart,
  deleteItemSuccess,
  deleteItemFailure,
} = itemSlice.actions;

export const itemSelector = (state: RootState) => state.item;

export default itemSlice.reducer;