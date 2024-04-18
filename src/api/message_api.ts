
import { MessageTypes } from '../constants/types';
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';
import APIs from './api';

class MessageApi {
    private message: APIs;
    private api: string = '/messages/';

    constructor(message: APIs) {
        this.message = message;
    }

    getMessages = async (id: number): Promise<Message[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.message.api.get(this.api + id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.messages);
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

    getConversation = async (uid: number): Promise<Conversation[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.message.api.get(this.api + 'conversation/' + uid)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.conversations);
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

    sendMessage = async (conversationId:number, uid: number, content: string, type: MessageTypes): Promise<Message> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    uid: uid,
                    content: content,
                    type: type
                }


                await this.message.api.post(this.api + conversationId, json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.message);
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

export default MessageApi;