
import { Item } from '../models/item';
import APIs from './api';

class ItemApi {
    private item: APIs;
    private api: string = '/items/';

    constructor(item: APIs) {
        this.item = item;
    }

    getItems = async (): Promise<Item[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.item.api.get(this.api)
                    .then((response) => {
                        const result = response.data.items;
                        resolve(result);
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

    getItem = async (id: number): Promise<Item> => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(this.api + id);
                await this.item.api.get(this.api + id)
                    .then((response) => {
                        const result = response.data.item;
                        resolve(result);
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

    createItem = async (
        name: string,
        description: string,
        condition: string,
        image: string,
        uid: number,
        ): Promise<Item> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    name: name,
                    description: description,
                    condition: condition,
                    image: image,
                    uid: uid,
                };

                await this.item.api.post(this.api, jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.item);
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

    updateItem = async (
        id: number,
        name: string,
        description: string,
        condition: string,
        image: string,
        uid: number,
        ): Promise<Item> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    name: name,
                    description: description,
                    condition: condition,
                    image: image,
                    uid: uid,
                };

                await this.item.api.put(this.api + id, jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.item);
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

    deleteItem = async (id: number): Promise<Item> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.item.api.delete(this.api + id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.item);
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

export default ItemApi;