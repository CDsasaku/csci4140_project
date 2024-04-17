import React, { useEffect } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { StyleSheet, View } from 'react-native';
import ConversationList from '../../components/organisms/conversation_list_tile';
import { Conversation } from '../../models/conversation';
import { DispatchThunk } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import messageAction from '../../redux/actions/message_actions';
import { messageSelector } from '../../redux/slices/message_slice';
import Container from '../../components/atoms/container';
import g_THEME from '../../theme/theme';

const ConversationScreen: React.FC<RootProps<'Message'>> = (props) => {

  const { conversations } = useSelector(messageSelector);
  const dispatch: DispatchThunk = useDispatch();

  useEffect(() => {
    dispatch(messageAction.getConversations(2));
  }, []);

  const handlePress = (conversationId: number) => {
    console.log('pressed');
    props.navigation.navigate('Chatroom', { conversationId: conversationId });
  }

  return (
    <View style={style.container}>
      {conversations && conversations.map((conversation: Conversation) =>
        <ConversationList conversation={conversation}
          key={conversation.id}
          onPress={() => handlePress(conversation.id)}
        />)}

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 10,
    height: '100%',
    backgroundColor: g_THEME.colors.secondaryGrey,
    borderRadius: 10,
    flex: 1,
  },
});


export default ConversationScreen;