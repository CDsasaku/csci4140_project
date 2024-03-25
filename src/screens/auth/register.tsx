import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';
import { RootProps } from '../../navigations/screen_navigation_props';
import { DispatchThunk } from '../../redux/store/store';
import { navigate } from '../../navigations/navigation_service';

const RegisterScreen: React.FC<RootProps<'Register'>> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: DispatchThunk = useDispatch();
  const error = useSelector(userSelector).error;

  const handleRegister = () => {
    // dispatch(register(email, password));
    navigate('Profile');
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
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;
