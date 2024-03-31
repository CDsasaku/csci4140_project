import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user_slice';
import itemReducer from './item_slice';

const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;