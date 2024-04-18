import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import g_THEME from '../../theme/theme';
import { Item as ItemType } from '../../models/item';
import { API_ENDPOINT } from '../../api/apiConfig';
import { RequestStatus } from '../../constants/types';
import { Icon } from 'react-native-paper';
import { StackView } from '@react-navigation/stack';
import CustomButton from '../atoms/button';

interface ItemProps {
  item: ItemType
  requestStatus?: RequestStatus
}

const Item: React.FC<ItemProps> = ({ item, requestStatus }) => {

  return (
    <View style={styles.item}>
      {/* <Image source={require('../../assets/corgi.jpg')} style={styles.photo} /> */}
      <Image source={{ uri: API_ENDPOINT + item?.image }} style={styles.photo} />
      <CustomText>{item.name}</CustomText>
      <CustomText>{item.User.username}</CustomText>
      {/* show request status */}
      {requestStatus == RequestStatus.REJECTED &&
        <View style={styles.rejected}>
          <CustomButton onPress={() => { }} color={g_THEME.colors.transparentRed} text={'REJECTED'} />
        </View>
      }

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
  rejected: {
    top: '34%',
    right: '14%',
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
  }

});


export default Item;