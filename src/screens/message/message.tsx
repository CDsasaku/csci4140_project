import React, { useEffect } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { View } from 'react-native';
import ConversationList from '../../components/organisms/conversation_list_tile';
import { Conversation } from '../../models/conversation';
import { DispatchThunk } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import messageAction from '../../redux/actions/message_actions';
import { messageSelector } from '../../redux/slices/message_slice';

const ConversationScreen: React.FC<RootProps<'Message'>> = (props) => {

  const { conversations } = useSelector(messageSelector);
  const dispatch: DispatchThunk = useDispatch();

  useEffect(() => {
    dispatch(messageAction.getConversations(2));
  }, []);
    
  return (
    <View>
       { conversations && conversations.map((conversation: Conversation) => <ConversationList conversation={conversation} key={conversation.id}/>) }
    </View>
  );
};

export default ConversationScreen;