import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import Container from '../atoms/container';
import g_THEME from '../../theme/theme';

interface ProductProps {
    text: string;
}

const Product: React.FC<ProductProps> = ({ text }) => {

    return (
          <View style={styles.product}>
            <Image source={require('../../assets/corgi.jpg')} style={styles.photo} />
            <CustomText>{text}</CustomText>
            <CustomText>post creator</CustomText>
          </View>
    );
};

const styles = StyleSheet.create({
    product: {
      backgroundColor: g_THEME.colors.white,
      borderRadius: 10,
      height: screenWidth * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 10,
      flex: 0.5
    },
    photo: {
      width: screenWidth * 0.3,
      height: screenWidth * 0.3,
    },
  });


export default Product;