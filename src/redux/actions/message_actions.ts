import { AppThunk } from '../store/store';
import { checkOrCreateConversationFailure, checkOrCreateConversationStart, checkOrCreateConversationSuccess, createMessageFailure, createMessageStart, createMessageSuccess, getConversationsFailure, getConversationsStart, getConversationsSuccess, getMessagesFailure, getMessagesStart, getMessagesSuccess } from '../slices/message_slice';
import apis from '../../api/api_service';
import { navigate, navigateBack } from '../../navigations/navigation_service';
import { MessageTypes } from '../../constants/types';

class MessageAction {

    getMessages = (id: number): AppThunk => async (dispatch) => {
        try {
            dispatch(getMessagesStart());
            const messages = await apis.message.getMessages(id);
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
            dispatch(getConversationsSuccess(message));
        } catch (error) {
            console.log(error);
            dispatch(getConversationsFailure(error as string));
        }
    }

    checkOrCreateConversation = (
        uid1: number,
        uid2: number
    ): AppThunk => async (dispatch) => {
        try {
            dispatch(checkOrCreateConversationStart());
            const conversation = await apis.message.checkOrCreateConversation(uid1, uid2);
            dispatch(checkOrCreateConversationSuccess(conversation));

            // Navigate to the chatroom if the conversation exists
            if (conversation) {
                navigate('Chatroom', { conversationId: conversation.id });
            }

        } catch (error) {
            console.log(error);
            dispatch(checkOrCreateConversationFailure(error as string));
        }
    }

    sendMessage = (
        conversationId: number,
        uid: number,
        content: string,
        type: MessageTypes
    ): AppThunk => async (dispatch) => {
        try {
            dispatch(createMessageStart());
            const message = await apis.message.sendMessage(conversationId, uid, content, type);
            dispatch(createMessageSuccess(message));
        } catch (error) {
            console.log(error);
            dispatch(createMessageFailure(error as string));
        }
    }
}

const messageAction = new MessageAction();

export default messageAction;