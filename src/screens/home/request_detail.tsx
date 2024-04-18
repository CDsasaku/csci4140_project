import React, { Fragment, useEffect, useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Image, StyleSheet, View } from 'react-native';
import CustomText from '../../components/atoms/text';
import { screenHeight } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import CustomButton from '../../components/atoms/button';
import Container from '../../components/atoms/container';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import item from '../../components/organisms/item';
import itemAction from '../../redux/actions/item_actions';
import { DispatchThunk } from '../../redux/store/store';
import { itemSelector } from '../../redux/slices/item_slice';
import ItemDetailText from '../../components/organisms/item_detail_text';
import { API_ENDPOINT } from '../../api/apiConfig';


const RequsetDetailScreen: React.FC<RootProps<'RequestDetail'>> = (props) => {

    const { itemId, requestId } = props.route.params;
    const item = useSelector(itemSelector).request;

    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
        dispatch(itemAction.getRequest(itemId));
    }, []);

    const handleChat = () => {
        props.navigation.navigate('Chatroom', { conversationId: 1 });
    }

    const handleAcceptRequest = () => {
        // dispatch(itemAction.acc(requestId));
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
                    <CustomButton text="Chat" onPress={handleChat} />
                    <CustomButton text="Accept Request" color={g_THEME.colors.blue} onPress={handleAcceptRequest} />

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

export default RequsetDetailScreen;