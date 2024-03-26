import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../screen_navigation_props";
import HomeScreen from '../../screens/home/home';

const HomeProps = createStackNavigator<RootStackParamList>();

export const HomeStackNavigation = () => {
  return (
    <HomeProps.Navigator initialRouteName='Home' screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: 'white' }
    }}>
      <HomeProps.Screen name="Home" component={HomeScreen} />
    </HomeProps.Navigator>
  );
}