import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';
import { RootProps } from '../../navigations/screen_navigation_props';
import { DispatchThunk } from '../../redux/store/store';
import { navigate } from '../../navigations/navigation_service';
import userAction from '../../redux/actions/user_actions';
import TextField from '../../components/molecules/text_field';
import CustomButton from '../../components/atoms/button';
import g_THEME from '../../theme/theme';

const RegisterScreen: React.FC<RootProps<'Register'>> = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: DispatchThunk = useDispatch();
  const error = useSelector(userSelector).error;

  const handleRegister = () => {
    // checking if format is correct
    if (!email.includes('@')) {
      ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
      return;
    }
    if (password.length < 6) {
      ToastAndroid.show('Password should be at least 6 characters', ToastAndroid.SHORT);
      return;
    }
    if (username.length < 3) {
      ToastAndroid.show('Username should be at least 3 characters', ToastAndroid.SHORT);
      return;
    }

    dispatch(userAction.register(username, email, password));
  };

  return (
    <View style={styles.container}>
      <TextField
        hint="Username"
        text={username}
        onChange={(e) => setUsername(e)}
      />
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
      <CustomButton text="Register" margin={0} width="100%" color={g_THEME.colors.darkGrey} borderRadius={5} onPress={handleRegister} />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;
