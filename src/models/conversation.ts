import { Message } from "./message";
import { User } from "./user";

class Conversation {
    id: number;
    uid1: number;
    uid2: number;
    user1?: User;
    user2?: User;
    Messages?: Message[];
    constructor(
        id: number = 0,
        uid1: number = 0,
        uid2: number = 0,
        user1?: User,
        user2?: User,
        messages?: Message[],
    ) {
        this.id = id;
        this.uid1 = uid1;
        this.uid2 = uid2;
        this.user1 = user1;
        this.user2 = user2;
        this.Messages = messages;
    }

}

export { Conversation };