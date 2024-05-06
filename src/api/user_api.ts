
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
                await this.user.api.post(this.api + uid)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.user);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        console.log(result.message)
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    userLogin = async (
        email: string,
        password: string,
        fcmToken: string
    ): Promise<User> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    email: email,
                    password: password,
                    fcmToken: fcmToken
                }
                await this.user.api.post(this.api + "login", jsonData)
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

    userRegister = async (
        username: string,
        email: string,
        password: string,
        ): Promise<User> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const jsonData = {
                        username: username,
                        email: email,
                        password: password,
                    }
                    await this.user.api.post(this.api + "register", jsonData)
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

                await this.user.api.put('users', jsonData)
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