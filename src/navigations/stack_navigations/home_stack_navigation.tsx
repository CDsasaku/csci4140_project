import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../screen_navigation_props";
import HomeScreen from '../../screens/home/home';
import ItemDetail from '../../screens/home/item_detail';
import AddOrEditItem from '../../screens/home/add_edit_item';

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
    </HomeProps.Navigator>
  );
}