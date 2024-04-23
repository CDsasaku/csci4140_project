

import { getNotificationsFailure, getNotificationsStart, getNotificationsSuccess, updateNotificationsFailure, updateNotificationsStart, updateNotificationsSuccess } from '../slices/user_slice';
import { AppThunk } from '../store/store';
import apis from '../../api/api_service';
import { NotificationStatus } from '../../constants/types';

class NotificationAction {

    getNotifications = (uid: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getNotificationsStart());
            const notifications = await apis.notification.getNotifications(uid);
            dispatch(getNotificationsSuccess(notifications));
        } catch (error) {
            console.log(error);
            dispatch(getNotificationsFailure(error as string));
        }
    }

    updateNotificationStatus = (id: number, status: NotificationStatus): AppThunk => async (dispatch) => {
        try {
            dispatch(updateNotificationsStart());
            const notification = await apis.notification.updateNotificationStatus(id, status);
            dispatch(updateNotificationsSuccess(notification));
        } catch (error) {
            console.log(error);
            dispatch(updateNotificationsFailure(error as string));
        }
    }
}

const notificationAction = new NotificationAction();

export default notificationAction;