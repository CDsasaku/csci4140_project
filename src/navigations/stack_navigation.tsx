import * as React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login';
import { RootStackParamList } from './screen_navigation_props';
import { useState } from 'react';
import { setNavigationRef } from './navigation_service';
import TabNavigation from './tab_navigation';
import RegisterScreen from '../screens/auth/register';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const navigationRef = React.useRef<NavigationContainerRef<RootStackParamList> | null>(null);

  return <NavigationContainer ref={navigationRef} onReady={() => setNavigationRef(navigationRef.current)}>
    <Stack.Navigator screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: 'white',
      },
      headerStyle: {
        backgroundColor: 'white',
      },
    }} initialRouteName={isLogin ? 'HomeBottomBarNavigation' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeBottomBarNavigation" component={TabNavigation} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
};

export default StackNavigation;