import React, { useEffect, useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SearchBar from '../../components/organisms/search_bar';
import CustomText from '../../components/atoms/text';
import Row from '../../components/atoms/row';
import g_THEME from '../../theme/theme';
import RoundButton from '../../components/molecules/round_button';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Item from '../../components/organisms/item';
import IconButton from '../../components/atoms/icon_button';
import { DispatchThunk } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import itemAction from '../../redux/actions/item_actions';
import { itemSelector } from '../../redux/slices/item_slice';
import { Category } from '../../models/category';

const HomeScreen: React.FC<RootProps<'Home'>> = (props) => {
  const dispatch: DispatchThunk = useDispatch();
  const { items, categories } = useSelector(itemSelector);
  const [categoryId, setCategoryId] = useState<number | null>();
  const [type, setType] = useState('Featured');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(itemAction.getItems());
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    dispatch(itemAction.getItems(categoryId, searchText));
  }

  const handleCategorySelect = (categoryId: number) => {
    dispatch(itemAction.getItems(categoryId, searchText));
  }

  const handleRemoveFilter = () => {
    setCategoryId(null);
    setSearchText('');
    dispatch(itemAction.getItems());
  }

  const handleType = (type: string) => {
    setType(type);
  }

  const handleItem = (itemId: number) => {
    props.navigation.navigate('ItemDetail', { itemId: itemId });
  }

  const handleAdd = () => {
    props.navigation.navigate('AddOrEditItem', { isEdit: false });
  }

  return (
    <View style={styles.wholePage}>
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar text={searchText} onChange={handleSearch}></SearchBar>
        <Row justifyContent='space-between'>
          <CustomText size={16} padding={15}>Categories</CustomText>
          <TouchableOpacity onPress={handleRemoveFilter}>
            <CustomText size={14} padding={15} color={g_THEME.colors.grey}>Remove filter</CustomText>
          </TouchableOpacity>
        </Row>
        <FlatList
          horizontal={true}
          data={categories}
          renderItem={({ item }) =>
            <RoundButton text={item.name} onPress={() => handleCategorySelect(item.id)} ></RoundButton>
          }

        ></FlatList>
        <View style={styles.bottomContainer}>
          <Row justifyContent='space-around'>
            <CustomText size={16} padding={15} focused={type == 'Featured'} onPress={() => handleType('Featured')}>Featured Item</CustomText>
            <CustomText size={16} padding={15} focused={type == 'Top'} onPress={() => handleType('Top')}>Top Rated Item</CustomText>
          </Row>
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

      </ScrollView>
      <View style={styles.add}>
        <IconButton icon='add' width={40} color={g_THEME.colors.white} backgroundColor={g_THEME.colors.blue} onPress={handleAdd}></IconButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    height: '100%',
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
  add: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  }
});


export default HomeScreen;