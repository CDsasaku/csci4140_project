
import { Asset } from 'react-native-image-picker';
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
        image: Asset,
        uid: number,
        wishlist: string,
    ): Promise<Item> => {
        return new Promise(async (resolve, reject) => {
            try {

                const formData = new FormData();
                formData.append('img', {
                    uri: image.uri,
                    name: image.fileName,
                    type: image.type,
                });
                formData.append('name', name);
                formData.append('description', description);
                formData.append('condition', condition);
                formData.append('uid', uid.toString());
                formData.append('wishlist', wishlist);


                await this.item.api.post(this.api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
                )
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

    updateItem = async (
        id: number,
        name: string,
        description: string,
        condition: string,
        uid: number,
        wishlist: string,
        image?: Asset,
    ): Promise<Item> => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const formData = new FormData();
                if(image) {
                    formData.append('img', {
                        uri: image.uri,
                        name: image.fileName,
                        type: image.type,
                    });
                }
                formData.append('name', name);
                formData.append('description', description);
                formData.append('condition', condition);
                formData.append('uid', uid.toString());
                formData.append('wishlist', wishlist);


                await this.item.api.put(this.api + id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
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

    deleteItem = async (id: number): Promise<Item> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.item.api.delete(this.api + id)
                    .then((response) => {
                        const result = response.data.message;
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
}

export default ItemApi;