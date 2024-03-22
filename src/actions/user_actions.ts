

import { logoutUserStart, logoutUserSuccess, logoutUserFailure } from '../redux/slices/user_slice';
 
import { loginUserFailure, loginUserStart, loginUserSuccess } from '../redux/slices/user_slice';
import { AppThunk } from '../redux/store/store';
import { navigate, navigateAndReset } from '../navigations/navigation_service';
import { User } from '../models/user';

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
    try {
        dispatch(loginUserStart());
        // await apis.auth.login(username, password);
        dispatch(loginUserSuccess(new User()));
        navigate('HomeBottomBarNavigation');
    } catch (error) {
        console.log(error);
        dispatch(loginUserFailure(error as string));
    }
}

export const logout = (username: string, password: string): AppThunk => async (dispatch) => {
    try {
        dispatch(logoutUserStart());
        // await apis.auth.out();
        dispatch(logoutUserSuccess());
        navigateAndReset('Login');
    } catch (error) {
        console.log(error);
        dispatch(logoutUserFailure(error as string));
    }
}