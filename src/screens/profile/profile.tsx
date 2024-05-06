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


const ProfileScreen: React.FC<RootProps<'Profile'>> = (props) => {
  const dispatch: DispatchThunk = useDispatch();
  const { user } = useSelector(userSelector);
  const { username, email, uid, icon } = user;
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
    dispatch(userAction.logout(email));
  }

  const determineIcon = () => {
    if (icon !== "default.png") {
      return { uri: icon }
    } 
    return require('../../assets/default_pfp.jpeg')
  }

    
  return (
    <View style={styles.wholePage}>
      <View style={styles.logout}>
        <IconButton icon='logout' width={40} color={g_THEME.colors.darkGrey} backgroundColor={"transparent"} onPress={handlelogout}></IconButton>
      </View>
      <Image source={determineIcon()} style={styles.photo} />
      <CustomText size={20} padding={0}>{username}</CustomText>
      <CustomText size={16} padding={0}>{email}</CustomText>
      <View style={styles.bottomContainer}>
        <FlatList
          scrollEnabled={false}
          data={items}
          renderItem={({ item }) =>
            <TouchableOpacity style={styles.item} onPress={() => handleItem(item.id)}>
              <Item item={item}></Item>
            </TouchableOpacity>
          }
          numColumns={2}>
        </FlatList>
      </View>
      <View style={styles.add}>
        <IconButton icon='add' width={40} color={g_THEME.colors.white} backgroundColor={g_THEME.colors.blue} onPress={handleAdd}></IconButton>
      </View>
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


export default ProfileScreen;