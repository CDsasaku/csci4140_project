
import { User } from '../models/user';
import APIs from './api';

class UserApi {
    private user: APIs;
    private api: string = '/users/';

    constructor(user: APIs) {
        this.user = user;
    }

    getProfile = async (uid: number): Promise<User> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.user.api.get(this.api + uid)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.user);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateProfile = async (
        username: string,
        name?: string,
        nationality?: string,
        gender?: string,
        age?: number
        ): Promise<User> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "username": username,
                    "name": name,
                    "nationality": nationality,
                    "gender": gender,
                    "age": age
                };

                await this.user.api.put('/users', jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.user);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default UserApi;