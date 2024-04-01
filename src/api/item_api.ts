
import { Asset } from 'react-native-image-picker';
import { Item } from '../models/item';
import APIs from './api';
import { Category } from '../models/category';

class ItemApi {
    private item: APIs;
    private api: string = '/items/';

    constructor(item: APIs) {
        this.item = item;
    }

    getItems = async (categoryId?: number | null, keyword?: string | null): Promise<Item[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                let url = this.api;
                if(categoryId && keyword) {
                    url += "?categoryId=" + categoryId + "&keyword=" + keyword;
                } else if(categoryId) {
                    url += "?categoryId=" + categoryId;
                } else if(keyword) {
                    url += "?keyword=" + keyword;
                }

                console.log(url)
                await this.item.api.get(url)
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
        categoryId: number,
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
                formData.append('categoryId', categoryId);
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
        categoryId: number,
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
                formData.append('categoryId', categoryId);
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

    getCategories = async (): Promise<Category[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.item.api.get(this.api + 'categories')
                    .then((response) => {
                        const result = response.data.categories;
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