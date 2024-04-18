import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../screen_navigation_props";
import HomeScreen from '../../screens/home/home';
import ItemDetail from '../../screens/home/item_detail';
import AddOrEditItem from '../../screens/home/add_edit_item';
import CheckRequestScreen from '../../screens/home/check_request';
import RequestScreen from '../../screens/home/request';
import RequsetDetailScreen from '../../screens/home/request_detail';
import ChatroomScreen from '../../screens/message/chatroom';

const HomeProps = createStackNavigator<RootStackParamList>();

export const HomeStackNavigation = () => {
  return (
    <HomeProps.Navigator initialRouteName='Home' screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: 'white' }
    }}>
      <HomeProps.Screen name="Home" component={HomeScreen} />
      <HomeProps.Screen name="ItemDetail" component={ItemDetail} />
      <HomeProps.Screen name="AddOrEditItem" component={AddOrEditItem} />
      <HomeProps.Screen name="CheckRequest" component={CheckRequestScreen} />
      <HomeProps.Screen name="RequestDetail" component={RequsetDetailScreen} />
      <HomeProps.Screen name="Request" component={RequestScreen} />
      <HomeProps.Screen name="Chatroom" component={ChatroomScreen} />
    </HomeProps.Navigator>
  );
}