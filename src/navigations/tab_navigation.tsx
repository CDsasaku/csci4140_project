import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileStackNavigation } from './stack_navigations/profile_stack_navigation';
import { RootProps, RootStackParamList } from './screen_navigation_props';


const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigation: React.FC<RootProps<'HomeBottomBarNavigation'>> = (props) => {

  return (
    <Tab.Navigator initialRouteName="ProfileStack" >
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigation}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigation;