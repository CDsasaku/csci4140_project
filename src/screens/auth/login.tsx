import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';
import { RootProps } from '../../navigations/screen_navigation_props';
import userAction from '../../redux/actions/user_actions';
import { DispatchThunk } from '../../redux/store/store';
import { navigate } from '../../navigations/navigation_service';
import itemAction from '../../redux/actions/item_actions';
import usePushNotification from '../../notification/usePushNotification';
import { Dialog } from 'react-native-paper';

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
      console.log('user', user);
      return;
    }
  };

  const handleRegister = () => {
    navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default LoginScreen;
