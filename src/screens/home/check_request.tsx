import React, { useEffect } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import g_THEME from '../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchThunk } from '../../redux/store/store';
import { itemSelector } from '../../redux/slices/item_slice';
import Item from '../../components/organisms/item';
import itemAction from '../../redux/actions/item_actions';
import CustomButton from '../../components/atoms/button';

const CheckRequestScreen: React.FC<RootProps<'CheckRequest'>> = (props) => {

    const { itemId } = props.route.params;
    const { requests } = useSelector(itemSelector);

    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
        dispatch(itemAction.getRequests(itemId));
    }, []);

    const handleRequest = (availableItemId: number, requestId: number) => {
        props.navigation.navigate('RequestDetail', { itemId: availableItemId, requestId: requestId });
    }



    return (
        <View style={styles.container}>
            <FlatList
                scrollEnabled={false}
                data={requests}
                renderItem={( { item } ) =>
                    <TouchableOpacity style={styles.item} onPress={() => handleRequest(item.availableItemId, item.id)}>
                        {item.availableItem && <Item item={item.availableItem} requestStatus={item.status} ></Item>}
                    </TouchableOpacity>
                }
                numColumns={2}>
            </FlatList>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: '100%',
        backgroundColor: g_THEME.colors.secondaryGrey,
        borderRadius: 10,
        flex: 1,
    },
    item: {
      flex: 0.5
    },
  });

export default CheckRequestScreen;