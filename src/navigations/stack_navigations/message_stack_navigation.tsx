import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../screen_navigation_props";
import MessageScreen from "../../screens/message/message";
import ChatroomScreen from '../../screens/message/chatroom';

const MessageProps = createStackNavigator<RootStackParamList>();

export const MessageStackNavigation = () => {
  return (
    <MessageProps.Navigator initialRouteName='Message' screenOptions={{
      headerShown: false,
    }}>
      <MessageProps.Screen name="Message" component={MessageScreen} />
      <MessageProps.Screen name="Chatroom" component={ChatroomScreen} />
    </MessageProps.Navigator>
  );
}