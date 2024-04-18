
import { Request } from '../models/request';
import APIs from './api';

class RequestApi {
    private request: APIs;
    private api: string = '/requests/';

    constructor(request: APIs) {
        this.request = request;
    }

    getRequests = async (itemId: number): Promise<Request[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.request.api.get(this.api + itemId)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.requests);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.request);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    createRequest = async (uid: number, itemId: number, availableItemId: number): Promise<Request> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    uid,
                    itemId,
                    availableItemId,
                }

                await this.request.api.post(this.api, json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.request);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.request);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteRequest = async (id: number): Promise<Request> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.request.api.delete(this.api + id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.request);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.request);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

}

export default RequestApi;