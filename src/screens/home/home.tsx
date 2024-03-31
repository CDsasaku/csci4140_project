import React, { useEffect, useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SearchBar from '../../components/organisms/search_bar';
import CustomText from '../../components/atoms/text';
import Row from '../../components/atoms/row';
import g_THEME from '../../theme/theme';
import RoundButton from '../../components/molecules/round_button';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Product from '../../components/organisms/product';
import IconButton from '../../components/atoms/icon_button';
import { DispatchThunk } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import itemAction from '../../redux/actions/item_actions';
import { itemSelector } from '../../redux/slices/item_slice';
import apis from '../../api/api_service';

const HomeScreen: React.FC<RootProps<'Home'>> = (props) => {
  const dispatch: DispatchThunk = useDispatch();
  const items = useSelector(itemSelector).items;
  const [type, setType] = useState('Featured');

  useEffect(() => {
    dispatch(itemAction.getItem());
  }, []);

  const handleType = (type: string) => {
    setType(type);
  }

  const handleProduct = (productId: number) => {
    console.log("Test");
    props.navigation.navigate('ProductDetail', { product_id: productId });
  }

  const handleAdd = () => {
    props.navigation.navigate('AddOrEditProduct', { product_id: 0 });
  }

  return (
    <View>
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
          data={items}
          renderItem={({ item }) =>
          <TouchableOpacity style={styles.product} onPress={() => handleProduct(1)}>
              <Product item={item}></Product>
          </TouchableOpacity>
          }
          numColumns={2}>
        </FlatList>
      </View>

    </ScrollView>
      <View style={styles.add}>
      <IconButton icon='add' width={40} color={g_THEME.colors.white} backgroundColor={g_THEME.colors.blue} onPress={handleAdd}></IconButton>
      </View>
      </View>
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
  product: {
    flex: 0.5
  },
  add: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  }
});


export default HomeScreen;