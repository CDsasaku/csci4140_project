import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../screen_navigation_props";
import NotificationScreen from "../../screens/notification/notification";

const NotificationProps = createStackNavigator<RootStackParamList>();

export const NotificationStackNavigation = () => {
  return (
    <NotificationProps.Navigator initialRouteName='Notification' screenOptions={{
      headerShown: false,
    }}>
      <NotificationProps.Screen name="Notification" component={NotificationScreen} />
    </NotificationProps.Navigator>
  );
}