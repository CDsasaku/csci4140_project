import { Action, applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import rootReducer, { RootState } from '../slices/root_reducers';

const store = configureStore({
    reducer: rootReducer
});




export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type DispatchThunk = ThunkDispatch<RootState, null, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;