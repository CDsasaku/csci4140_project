import React, { useEffect } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import g_THEME from '../../theme/theme';
import CustomText from '../../components/atoms/text';
import NotificationList from '../../components/organisms/notification_list_tile';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';
import notificationAction from '../../redux/actions/notification_actions';
import { DispatchThunk } from '../../redux/store/store';
import { NotificationStatus } from '../../constants/types';

const NotificationScreen: React.FC<RootProps<'Notification'>> = (props) => {

  const { notifications } = useSelector(userSelector);
  const dispatch: DispatchThunk = useDispatch();

  const handleUpdateNotification = (id: number) => {
    dispatch(notificationAction.updateNotificationStatus(id, NotificationStatus.READ));
  }

  return (
    <View style={style.container}>
      { 
        notifications.length === 0 ? 
        <View style={style.noNotification}>
          <CustomText>No Notifications</CustomText>
        </View>
         :
        notifications.map((notification, index) => (
          notification.status === NotificationStatus.UNREAD &&
            <NotificationList key={index} notification={notification} onPress={() => handleUpdateNotification(notification.id)}/>
        ))
      }
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 10,
    height: '100%',
    backgroundColor: g_THEME.colors.secondaryGrey,
    borderRadius: 10,
    flex: 1,
  },
  noNotification: {
    color: g_THEME.colors.secondaryGrey,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',

  },
  notification: {
    color: g_THEME.colors.secondaryGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationScreen;