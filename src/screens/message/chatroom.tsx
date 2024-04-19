import React, { ChangeEvent, useEffect } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { DispatchThunk } from '../../redux/store/store';
import g_THEME from '../../theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import { messageSelector } from '../../redux/slices/message_slice';
import messageAction from '../../redux/actions/message_actions';
import CustomText from '../../components/atoms/text';
import Bubble from '../../components/organisms/bubble';
import TextField from '../../components/molecules/text_field';
import Row from '../../components/atoms/row';
import IconButton from '../../components/atoms/icon_button';
import { MessageTypes } from '../../constants/types';
import { Modal } from 'react-native-paper';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import { userSelector } from '../../redux/slices/user_slice';

const ChatroomScreen: React.FC<RootProps<'Chatroom'>> = (props) => {

  const { messages } = useSelector(messageSelector);
  const dispatch: DispatchThunk = useDispatch();
  const { conversationId } = props.route.params;
  const [message, setMessage] = React.useState('');
  // const [modalVisible, setModalVisible] = React.useState(false);
  const { user } = useSelector(userSelector);

  useEffect(() => {
    dispatch(messageAction.getMessages(conversationId));
  }, []);

  const handleSend = () => {
    user && dispatch(messageAction.sendMessage(conversationId, user?.uid, message, MessageTypes.TEXT))
    setMessage('');
  }

  const handleMessageChange = (value: string) => {
    setMessage(value);
  }

  // const handleModal = () => {
  //   setModalVisible(!modalVisible);
  // }

  return (
    <View style={style.wholeContainer}>
      <View style={style.container}>
        <ScrollView style={style.chatContainer}>
          {messages.map((message, index) => (
            <View key={index}>
              <Bubble text={message.content} message={message} />
            </View>
          ))}
        </ScrollView>
        <View style={style.inputContainer}>
          <IconButton icon={'add'} color={g_THEME.colors.primary} onPress={() => {}} />
          <TextInput placeholder={'Type a message'} style={style.input} value={message} onChangeText={handleMessageChange} />
          <IconButton icon={'send'} color={g_THEME.colors.primary} onPress={handleSend} />
        </View>
      </View>
        {/* <Modal visible={modalVisible} >
          <View style={style.modal}>
            <CustomText textAlign='center'>Tradable Item</CustomText>
          </View>
        </Modal> */}
      </View>
  );
};

const style = StyleSheet.create({
  wholeContainer: {
    flex: 1,
    backgroundColor: g_THEME.colors.white,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  container: {
    margin: 10,
    height: '100%',
    backgroundColor: g_THEME.colors.secondaryGrey,
    borderRadius: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    backgroundColor: g_THEME.colors.white,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  modal: {
    backgroundColor: g_THEME.colors.white,
    padding: 20,
    borderRadius: 10,
    margin: 20,
    height: screenHeight * 0.7,
  }
});


export default ChatroomScreen;