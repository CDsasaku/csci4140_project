import React, { useEffect } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { FlatList, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import g_THEME from '../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchThunk } from '../../redux/store/store';
import { itemSelector } from '../../redux/slices/item_slice';
import Item from '../../components/organisms/item';
import itemAction from '../../redux/actions/item_actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/atoms/button';
import { userSelector } from '../../redux/slices/user_slice';

const RequestScreen: React.FC<RootProps<'CheckRequest'>> = (props) => {

    const { itemId } = props.route.params;
    const { availableItems, selectedItemIds } = useSelector(itemSelector);
    const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
    const { user } = useSelector(userSelector);

    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
        user && dispatch(itemAction.getAvailableItems(itemId, user?.uid));
    }, []);

    useEffect(() => {
        selectedItemIds && setSelectedItems(selectedItemIds);
    }, [selectedItemIds]);

    const handleRequest = (availableItemId: number) => {
        if (selectedItems.includes(availableItemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== availableItemId));
        } else {
            setSelectedItems([...selectedItems, availableItemId]);
        }
    }

    const handleSendRequest = () => {
        if (selectedItemIds.length == 0) {
            user && dispatch(itemAction.createRequests(user?.uid, itemId, selectedItems));
            ToastAndroid.show("Request sent", ToastAndroid.SHORT);
        } else {
            user && dispatch(itemAction.updateRequests(user?.uid, itemId, selectedItems));
            ToastAndroid.show("Request updated", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                scrollEnabled={false}
                data={availableItems}
                renderItem={({ item }) =>
                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity style={styles.item} onPress={() => handleRequest(item.id)}>
                            <Item item={item} ></Item>
                            {selectedItems.includes(item.id) &&
                                <View style={styles.selected}>
                                    <MaterialIcons name="check" style={styles.icon} size={20} color={g_THEME.colors.white} />
                                </View>
                            } 
                        </TouchableOpacity>
                    </View>
                }
                numColumns={2}>
            </FlatList>
            <CustomButton text="Send Request" color={g_THEME.colors.blue} onPress={handleSendRequest} />
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
    selected: {
        backgroundColor: g_THEME.colors.green,
        right: 5,
        top: 5,
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    icon: {
        alignSelf: 'center',
    }
});

export default RequestScreen;