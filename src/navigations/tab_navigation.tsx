import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootProps, RootStackParamList } from './screen_navigation_props';
import { ProfileStackNavigation } from './stack_navigations/profile_stack_navigation';
import ProfileScreen from '../screens/profile/profile';
import React from 'react';
import { screenHeight } from '../constants/screen_dimension';
import g_THEME from '../theme/theme';
import { StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeStackNavigation } from './stack_navigations/home_stack_navigation';
import { MessageStackNavigation } from './stack_navigations/message_stack_navigation';
import { NotificationStackNavigation } from './stack_navigations/notification_stack_navigation';
import CustomText from '../components/atoms/text';


const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigation: React.FC<RootProps<'HomeBottomBarNavigation'>> = (props) => {

  return (
    <Tab.Navigator initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: g_THEME.colors.secondary,
          elevation: 0,
          height: screenHeight * 0.08,
          paddingBottom: 3,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: g_THEME.colors.greyGreen,
        tabBarInactiveTintColor: g_THEME.colors.blue,
        tabBarLabel: ({ focused }) => {
          let color = focused ? g_THEME.colors.greyGreen : g_THEME.colors.blue;
          let name = getName(route.name);

          return <CustomText color={color}>{name}</CustomText>;
        },
        tabBarIcon: ({ focused }) => {
          let color = focused ? g_THEME.colors.greyGreen : g_THEME.colors.blue;
          let name = getIconName(route.name);

          return <MaterialIcons name={name} size={24} color={color} />;
        },
        header(props) {
          let name = getName(route.name);
          return <CustomText padding={10} size={18} textAlign='center'>{name}</CustomText>;
        },
      })}>
      <Tab.Screen name="HomeStack" component={HomeStackNavigation} />
      <Tab.Screen name="MessageStack" component={MessageStackNavigation} />
      <Tab.Screen name="NotificationStack" component={NotificationStackNavigation} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigation} />
    </Tab.Navigator>
  );
}

function getName(name: string): string {
  switch (name) {
    case 'HomeStack':
      return 'Home';
    case 'MessageStack':
      return 'Message';
    case 'NotificationStack':
      return 'Notification';
    case 'ProfileStack':
      return 'Profile';
    default:
      return '';
  }
}

function getIconName(name: string): string {
  switch (name) {
    case 'HomeStack':
      return 'home';
    case 'MessageStack':
      return 'chat';
    case 'NotificationStack':
      return 'notifications';
    case 'ProfileStack':
      return 'person';
    default:
      return '';
  }
}

export default TabNavigation;