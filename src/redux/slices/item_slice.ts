import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/item';
import { RootState } from './root_reducers';
import { Category } from '../../models/category';
import { create } from 'react-test-renderer';
import { Request } from '../../models/request';
import { ItemStatus } from '../../constants/types';

interface ItemState {
  items: Item[];
  item: Item | null;
  requests: Request[];
  request: Request | null;
  availableItems: Item[];
  selectedItemIds: number[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  item: null,
  requests: [],
  request: null,
  availableItems: [],
  selectedItemIds: [],
  categories: [],
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

    // update item status
    updateItemStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateItemStatusSuccess: (state, action: PayloadAction<string>) => {
      state.item!.status = action.payload;
      state.items = state.items.map((item) => item.id === state.item!.id ? state.item! : item);
      state.loading = false;
      state.error = null;
    },
    updateItemStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete item
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

    // get category
    getCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategorySuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCategoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get available items
    getAvailableItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAvailableItemsSuccess: (state, action: PayloadAction<Item[]>) => {
      state.availableItems = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSelectedItemIds: (state, action: PayloadAction<number[]>) => {
      state.selectedItemIds = action.payload;
    },
    getAvailableItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get request items
    getRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRequestsSuccess: (state, action: PayloadAction<Request[]>) => {
      state.requests = action.payload;
      state.loading = false;
      state.error = null;
    },
    getRequestsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get request item
    getRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRequestSuccess: (state, action: PayloadAction<Request>) => {
      state.request = action.payload;
      state.loading = false;
      state.error = null;
    },
    getRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // create request
    createRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRequestSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    createRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update request
    updateRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRequestsSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateRequestsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update request status
    updateRequestStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRequestStatusSuccess: (state, action: PayloadAction<Request>) => {
      state.requests = state.requests.map((request) => request.id === action.payload.id ? action.payload : request);
      state.request = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateRequestStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete request
    deleteRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRequestSuccess: (state, action: PayloadAction<number>) => {
      state.requests = state.requests.filter((request) => request.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  // item
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

  // category
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,

  // available item
  getAvailableItemsStart,
  getAvailableItemsSuccess,
  getSelectedItemIds,
  getAvailableItemsFailure,

  // request
  getRequestsStart,
  getRequestsSuccess,
  getRequestsFailure,
  getRequestStart,
  getRequestSuccess,
  getRequestFailure,
  createRequestStart,
  createRequestSuccess,
  createRequestFailure,
  updateRequestsStart,
  updateRequestsSuccess,
  updateRequestsFailure,
  updateRequestStatusStart,
  updateRequestStatusSuccess,
  updateRequestStatusFailure,
  deleteRequestStart,
  deleteRequestSuccess,
  deleteRequestFailure,
} = itemSlice.actions;

export const itemSelector = (state: RootState) => state.item;

export default itemSlice.reducer;