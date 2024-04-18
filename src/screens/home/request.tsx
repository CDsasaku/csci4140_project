import React, { useEffect } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import g_THEME from '../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchThunk } from '../../redux/store/store';
import { itemSelector } from '../../redux/slices/item_slice';
import Item from '../../components/organisms/item';
import itemAction from '../../redux/actions/item_actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/atoms/button';

const RequestScreen: React.FC<RootProps<'CheckRequest'>> = (props) => {

    const { itemId } = props.route.params;
    const { availableItems } = useSelector(itemSelector);
    const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
        dispatch(itemAction.getAvailableItems(2));
    }, []);

    const handleRequest = (availableItemId: number) => {
        if (selectedItems.includes(availableItemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== availableItemId));
        } else {
            setSelectedItems([...selectedItems, availableItemId]);
        }
    }

    const handleSendRequest = () => {
        dispatch(itemAction.createRequests(2, itemId, selectedItems));
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