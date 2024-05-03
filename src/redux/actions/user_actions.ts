

import { logoutUserStart, logoutUserSuccess, logoutUserFailure } from '../slices/user_slice';

import { loginUserFailure, loginUserStart, loginUserSuccess } from '../slices/user_slice';
import { AppThunk } from '../store/store';
import { navigate, navigateAndReset } from '../../navigations/navigation_service';
import { User } from '../../models/user';
import apis from '../../api/api_service';

class UserAction {

    login = (email: string, password: string, fcmToken: string): AppThunk => async (dispatch) => {
        try {
            dispatch(loginUserStart());
            const user = await apis.user.userLogin(email, password);
            // todo: make it the salted
            if (user) {
                dispatch(loginUserSuccess(user));
                navigate('HomeBottomBarNavigation');    // todo: change the location
            }
        } catch (error) {
            console.log(error);
            dispatch(loginUserFailure(error as string));
        }
    }

    register = (username: string, email: string, password: string): AppThunk => async (dispatch) => {
        try {
            const user = await apis.user.userRegister(username, email, password);
            if (user) {
                dispatch(loginUserSuccess(user));
                navigate('Profile');    // todo: change the location
            }

        } catch (error) {
            console.log(error);
            dispatch(loginUserFailure(error as string));
        }
    }

    logout = (username: string, password: string): AppThunk => async (dispatch) => {
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
}

const userAction = new UserAction();

export default userAction;