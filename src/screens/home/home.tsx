import React, { useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import Container from '../../components/atoms/container';
import TextField from '../../components/molecules/text_field';
import SearchBar from '../../components/organisms/search_bar';
import CustomText from '../../components/atoms/text';
import Row from '../../components/atoms/row';
import g_THEME from '../../theme/theme';
import { screenHeight, screenWidth } from '../../constants/screen_dimension';
import RoundButton from '../../components/molecules/round_button';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Product from '../../components/organisms/product';

const HomeScreen: React.FC<RootProps<'Home'>> = (props) => {

  const [type, setType] = useState('Featured');

  const handleType = (type: string) => {
    setType(type);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar text='Search here'></SearchBar>
      <Row justifyContent='space-between'>
        <CustomText size={16} padding={15}>Categories</CustomText>
        <CustomText size={14} padding={15} color={g_THEME.colors.grey}>See all</CustomText>
      </Row>
      <FlatList
        horizontal={true}
        data={['All', 'Clothes', 'Shoes', 'Bags', 'Accessories']}
        renderItem={({ item }) =>
          <RoundButton text={item}></RoundButton>
        }

      ></FlatList>
      <View style={styles.bottomContainer}>
        <Row justifyContent='space-around'>
          <CustomText size={16} padding={15} focused={type == 'Featured'} onPress={() => handleType('Featured')}>Featured Product</CustomText>
          <CustomText size={16} padding={15} focused={type == 'Top'} onPress={() => handleType('Top')}>Top Rated Product</CustomText>
        </Row>
        <FlatList
          scrollEnabled={false}
          data={['All', 'Clothes', 'Shoes', 'Bags', 'Accessories']}
          renderItem={({ item }) =>
              <Product text={item}></Product>
          }
          numColumns={2}>
        </FlatList>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bottomContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: g_THEME.colors.lightGrey,
  },
});


export default HomeScreen;