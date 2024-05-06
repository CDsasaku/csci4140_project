import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../screen_navigation_props";
import ProfileScreen from "../../screens/profile/profile";
import EditProfileScreen from '../../screens/profile/edit_profile';

const ProfileProps = createStackNavigator<RootStackParamList>();

export const ProfileStackNavigation = () => {
  return (
    <ProfileProps.Navigator initialRouteName='Profile' screenOptions={{
      headerShown: false,
    }}>
      <ProfileProps.Screen name="Profile" component={ProfileScreen} />
      <ProfileProps.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileProps.Navigator>
  );
}