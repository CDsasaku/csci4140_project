
import { User } from '../models/user';
import APIs from './api';

class UserApi {
    private user: APIs;

    constructor(user: APIs) {
        this.user = user;
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
                        resolve(result.data.user);
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