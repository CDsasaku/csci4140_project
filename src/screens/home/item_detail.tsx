import React, { Fragment, useEffect, useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Image, StyleSheet, View } from 'react-native';
import CustomText from '../../components/atoms/text';
import { screenHeight } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import CustomButton from '../../components/atoms/button';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import itemAction from '../../redux/actions/item_actions';
import { DispatchThunk } from '../../redux/store/store';
import { itemSelector } from '../../redux/slices/item_slice';
import ItemDetailText from '../../components/organisms/item_detail_text';
import { API_ENDPOINT } from '../../api/apiConfig';
import { ItemStatus } from '../../constants/types';
import { userSelector } from '../../redux/slices/user_slice';
import apis from '../../api/api_service';
import messageAction from '../../redux/actions/message_actions';
import { messageSelector } from '../../redux/slices/message_slice';


const ItemDetail: React.FC<RootProps<'ItemDetail'>> = (props) => {

    const { itemId } = props.route.params;
    const item = useSelector(itemSelector).item;
    const { user } = useSelector(userSelector);
    const isOwner = item?.uid == user?.uid;

    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
        dispatch(itemAction.getItem(itemId));
    }, []);

    const handleEdit = () => {
        props.navigation.navigate('AddOrEditItem', { isEdit: true });
    }

    const handleCheckRequest = () => {
        props.navigation.navigate('CheckRequest', { itemId: itemId });
    }

    const handleChat = async () => {
        if (item && user) {
            dispatch(messageAction.checkOrCreateConversation(item?.uid, user?.uid));
        }
    }

    const handleRequest = () => {

        props.navigation.navigate('Request', { itemId: itemId });
    }

    const renderButton = () => {
        if (item?.status == ItemStatus.AVAILABLE) {
            if (isOwner) {
                return (
                    <Fragment>
                        <CustomButton text="Check Request" color={g_THEME.colors.blue} onPress={handleCheckRequest} />
                        <CustomButton text="Edit" color={g_THEME.colors.primary} onPress={handleEdit} />
                    </Fragment>
                );

            } else {
                return (
                    <Fragment>
                        <CustomButton text="Chat" onPress={handleChat} />
                        <CustomButton text="Request" color={g_THEME.colors.blue} onPress={handleRequest} />
                    </Fragment>
                );
            }
        } else {
            return (
                <Fragment>
                    <CustomButton text="Chat" onPress={handleChat} />
                    <CustomButton text="Requested" color={g_THEME.colors.primary} onPress={() => { }} />
                </Fragment>
            );
        }
    }


    return (
        <ScrollView style={styles.container}>
            <CustomText size={22}>{item?.User.username}</CustomText>
            <View style={styles.innerContainer}>
                <Image source={{ uri: API_ENDPOINT + item?.image }} style={styles.image} />
                <View style={styles.bottomContainer}>
                    <CustomText size={22}>{item?.name}</CustomText>
                    <ItemDetailText label="Description" text={item?.description} />
                    <ItemDetailText label="Condition" text={item?.Condition?.name} />
                    <ItemDetailText label="Category" text={item?.Category?.name} />
                    <ItemDetailText label="Wish List" text={item?.wishlist} />
                    {renderButton()}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: g_THEME.colors.secondary,
        height: screenHeight,
    },
    image: {
        width: '100%',
        height: screenHeight * 0.4,
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 5,
        padding: 10,
    },
    bottomContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 15,
    },
    description: {
        flex: 1,
        marginVertical: 10,
    },
});

export default ItemDetail;