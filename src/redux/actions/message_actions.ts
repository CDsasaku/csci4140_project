import { AppThunk } from '../store/store';
import { createMessageFailure, createMessageStart, createMessageSuccess, getConversationsFailure, getConversationsStart, getConversationsSuccess, getMessagesFailure, getMessagesStart, getMessagesSuccess  } from '../slices/message_slice';
import apis from '../../api/api_service';
import { navigateBack } from '../../navigations/navigation_service';
import { MessageTypes } from '../../constants/types';

class MessageAction {

    getMessages = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getMessagesStart());
            const messages = await apis.message.getMessages(id);
            console.log(messages);
            dispatch(getMessagesSuccess(messages));
        } catch (error) {
            console.log(error);
            dispatch(getMessagesFailure(error as string));
        }
    }

    getConversations = (uid: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getConversationsStart());
            const message = await apis.message.getConversation(uid);
            console.log(message);
            dispatch(getConversationsSuccess(message));
        } catch (error) {
            console.log(error);
            dispatch(getConversationsFailure(error as string));
        }
    }

    sendMessage = (
        conversationId:number,
        uid: number,
        content: string,
        type: MessageTypes
    ): AppThunk => async (dispatch) => {
        try {
            dispatch(createMessageStart());
            const message = await apis.message.sendMessage(conversationId, uid, content, type);
            console.log(message);
            dispatch(createMessageSuccess(message));
        } catch (error) {
            console.log(error);
            dispatch(createMessageFailure(error as string));
        }
    }
}

const messageAction = new MessageAction();

export default messageAction;