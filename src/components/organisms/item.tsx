import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import g_THEME from '../../theme/theme';
import { Item as ItemType } from '../../models/item';

interface ItemProps {
  item: ItemType
}

const Item: React.FC<ItemProps> = ({ item }) => {

  return (
    <View style={styles.item}>
      <Image source={require('../../assets/corgi.jpg')} style={styles.photo} />
      <CustomText>{item.name}</CustomText>
      <CustomText>{item.User.username}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: g_THEME.colors.white,
    borderRadius: 10,
    height: screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  photo: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
  },
});


export default Item;