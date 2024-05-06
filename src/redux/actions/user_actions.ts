

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
            const user = await apis.user.userLogin(email, password, fcmToken);
            if (user) {
                console.log("user", user)
                dispatch(loginUserSuccess(user));
                navigate('HomeBottomBarNavigation');
            }
        } catch (error) {
            console.log("test page errror", error);
            dispatch(loginUserFailure("Login Failure"));
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

    logout = (email: string): AppThunk => async (dispatch) => {
        try {
            dispatch(logoutUserStart());
            await apis.user.userLogout(email);
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