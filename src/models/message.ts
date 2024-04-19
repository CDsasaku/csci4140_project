import { User } from "./user";

class Message {
    id: number;
    content: string;
    uid: number;
    conversationId?: number;
    User?: User;
    type?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: number = 0,
        content: string = '',
        uid: number = 0,
        conversationId?: number,
        User?: User,
        type?: string,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = id;
        this.content = content;
        this.uid = uid;
        this.conversationId = conversationId;
        this.User = User;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

export { Message };