import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../screen_navigation_props";
import ProfileScreen from "../../screens/profile/profile";
import EditProfileScreen from '../../screens/profile/edit_profile';
import AddOrEditItem from '../../screens/home/add_edit_item';
import ItemDetail from '../../screens/home/item_detail';
import CheckRequestScreen from '../../screens/home/check_request';

const ProfileProps = createStackNavigator<RootStackParamList>();

export const ProfileStackNavigation = () => {
  return (
    <ProfileProps.Navigator initialRouteName='Profile' screenOptions={{
      headerShown: false,
    }}>
      <ProfileProps.Screen name="Profile" component={ProfileScreen} />
      <ProfileProps.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileProps.Screen name="ItemDetail" component={ItemDetail} />
      <ProfileProps.Screen name="AddOrEditItem" component={AddOrEditItem} />
      <ProfileProps.Screen name="CheckRequest" component={CheckRequestScreen} />
    </ProfileProps.Navigator>
  );
}