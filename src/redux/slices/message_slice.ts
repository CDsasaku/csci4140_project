import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../models/message';
import { RootState } from './root_reducers';
import { Conversation } from '../../models/conversation';

interface MessageState {
  messages: Message[];
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  conversations: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {

    // get messages
    getMessagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMessagesSuccess: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    getMessagesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get message
    getConversationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConversationsSuccess: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
      state.loading = false;
      state.error = null;
    },
    getConversationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // create message
    createMessageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createMessageSuccess: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createMessageFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesFailure,
  getConversationsStart,
  getConversationsSuccess,
  getConversationsFailure,
  createMessageStart,
  createMessageSuccess,
  createMessageFailure,
} = messageSlice.actions;

export const messageSelector = (state: RootState) => state.message;

export default messageSlice.reducer;