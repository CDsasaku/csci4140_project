
import { NotificationStatus } from '../constants/types';
import { Notification } from '../models/notification';
import APIs from './api';

class NotificationApi {
    private notification: APIs;
    private api: string = '/notifications/';

    constructor(notification: APIs) {
        this.notification = notification;
    }

    getNotifications = async (uid: number): Promise<Notification[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.notification.api.get(this.api + uid)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.notifications);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.notification);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateNotificationStatus = async (id: number, status: NotificationStatus): Promise<Notification> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    status,
                }

                await this.notification.api.put(this.api + id, json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.notification);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.notification);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

}

export default NotificationApi;