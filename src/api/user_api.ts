
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
                        console.log(response);
                        const result = response.data;
                        console.log(result)
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

    userLogout = async (
        email: string,
        ): Promise<User> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const jsonData = {
                        email: email,
                    }
                    await this.user.api.post(this.api + "logout", jsonData)
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

    updateUser = async (
        username: string,
        email: string,
        uid: number
        ): Promise<User> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "username": username,
                    "email": email,
                    "uid": uid,
                }

                await this.user.api.post(this.api + "update", jsonData)
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