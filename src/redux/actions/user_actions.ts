

import { logoutUserStart, logoutUserSuccess, logoutUserFailure } from '../slices/user_slice';

import { loginUserFailure, loginUserStart, loginUserSuccess } from '../slices/user_slice';
import { AppThunk } from '../store/store';
import { navigate, navigateAndReset } from '../../navigations/navigation_service';
import { User } from '../../models/user';

class UserAction {

    login = (username: string, password: string): AppThunk => async (dispatch) => {
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