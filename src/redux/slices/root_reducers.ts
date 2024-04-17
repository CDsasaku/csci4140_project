import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user_slice';
import itemReducer from './item_slice';
import messageReducer from './message_slice';

const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
  message: messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;