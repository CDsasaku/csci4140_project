import React, { useEffect, useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CustomText from '../../components/atoms/text';
import { DispatchThunk } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';
import { itemSelector } from '../../redux/slices/item_slice';
import itemAction from '../../redux/actions/item_actions';
import g_THEME from '../../theme/theme';
import Item from '../../components/organisms/item';
import IconButton from '../../components/atoms/icon_button';
import userAction from '../../redux/actions/user_actions';
import Row from '../../components/atoms/row';


const EditProfileScreen: React.FC<RootProps<'EditProfile'>> = (props) => {
  const { user } = useSelector(userSelector);
  const dispatch: DispatchThunk = useDispatch();
  const { username, email, uid, icon } = user || {}; // Add a default empty object if user is null
  const { items } = useSelector(itemSelector);

  useEffect(() => {
    if (!uid) return;
    dispatch(itemAction.getItems(null, null, null, uid))
  }, [])


  const handleItem = (itemId: number) => {
    props.navigation.navigate('ItemDetail', { itemId: itemId });
  }

  const handleAdd = () => {
    props.navigation.navigate('AddOrEditItem', { isEdit: false });
  }

  const handlelogout = () => {
    if (!email) return;
    dispatch(userAction.logout(email));
  }

  const handleEdit = () => {
    if (!uid) return;
    props.navigation.navigate('EditProfile');
  }

  const determineIcon = () => {
    if (icon && icon !== "default.png") {
      return { uri: icon }
    } 
    return require('../../assets/default_pfp.jpeg')
  }

    
  return (
    <View style={styles.wholePage}>
    </View>
  );

};

const styles = StyleSheet.create({
  wholePage: {
    height: '100%',
    flex: 1,
    gap: 20,
    paddingLeft: 15,
  },
  container: {
    backgroundColor: g_THEME.colors.white,
    paddingBottom: 20,
  },
  bottomContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: g_THEME.colors.lightGrey,
    
  },
  item: {
    flex: 0.5
  },
  logout: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  add: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    padding: 15,
  },
});  


export default EditProfileScreen;