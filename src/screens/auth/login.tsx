import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';
import { RootProps } from '../../navigations/screen_navigation_props';
import userAction from '../../redux/actions/user_actions';
import { DispatchThunk } from '../../redux/store/store';
import { navigate } from '../../navigations/navigation_service';
import itemAction from '../../redux/actions/item_actions';
import usePushNotification from '../../notification/usePushNotification';
import { Dialog } from 'react-native-paper';
import TextField from '../../components/molecules/text_field';
import CustomButton from '../../components/atoms/button';
import g_THEME from '../../theme/theme';

const LoginScreen: React.FC<RootProps<'Login'>> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: DispatchThunk = useDispatch();
  const error = useSelector(userSelector).error;
  const user = useSelector(userSelector).user;

  const handleLogin = async () => {
    const fcmToken = await usePushNotification().getFCMToken();
    console.log('fcmToken', fcmToken)
    dispatch(userAction.login(email, password, fcmToken ?? ''));
    dispatch(itemAction.getCategories());
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      return;
    }
  };

  const handleRegister = () => {
    navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/application_logo.png')} style={styles.photo} />
      <TextField
        hint="Email"
        text={email}
        onChange={setEmail}
      />
      <TextField
        hint="Password"
        text={password}
        onChange={setPassword}
        secure
      />
      <CustomButton text="Login" margin={0} width="100%" color={g_THEME.colors.darkGrey} borderRadius={5} onPress={handleLogin} />
      <CustomButton text="Register" margin={0} width="100%" color={g_THEME.colors.darkGrey} borderRadius={5} onPress={handleRegister} />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 16,
  },
  input: {
    color: 'black',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  photo: {
    width: '65%',
    height: 40,
  },
});

export default LoginScreen;
