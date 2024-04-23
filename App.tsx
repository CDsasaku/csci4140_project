
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import StackNavigation from './src/navigations/stack_navigation';
import store from './src/redux/store/store';
import usePushNotification from './src/notification/usePushNotification';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';

function App(): React.JSX.Element {

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('App', () => App);

export default App;
