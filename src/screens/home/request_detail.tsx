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
import { RequestStatus } from '../../constants/types';


const RequsetDetailScreen: React.FC<RootProps<'RequestDetail'>> = (props) => {

    const { requestId } = props.route.params;
    const request = useSelector(itemSelector).request;

    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
        dispatch(itemAction.getRequest(requestId));
    }, []);

    const handleChat = () => {
        props.navigation.navigate('Chatroom', { conversationId: 1 });
    }

    const handleAcceptRequest = () => {
        dispatch(itemAction.updateRequestStatus(requestId, RequestStatus.ACCEPTED));
    }

    const handleRejectRequest = () => {
        dispatch(itemAction.updateRequestStatus(requestId, RequestStatus.REJECTED));
    }

    const renderButton = () => {
        if (request?.status == RequestStatus.PENDING) {
            return (
                <View>
                    <CustomButton text="Accept Request" color={g_THEME.colors.blue} onPress={handleAcceptRequest} />
                    <CustomButton text="Reject Request" color={g_THEME.colors.error} onPress={handleRejectRequest} />
                </View>
            );
        } else if (request?.status == RequestStatus.ACCEPTED) {
            return <CustomButton text="Accepted" color={g_THEME.colors.blue} onPress={() => { }} />;
        } else {
            return <CustomButton text="Rejected" color={g_THEME.colors.error} onPress={() => { }} />;
        }
    }


    return (
        <ScrollView style={styles.container}>
            <CustomText size={22}>{request?.availableItem?.User.username}</CustomText>
            <View style={styles.innerContainer}>
                <Image source={{ uri: API_ENDPOINT + request?.availableItem?.image }} style={styles.image} />
                <View style={styles.bottomContainer}>
                    <CustomText size={22}>{request?.availableItem?.name}</CustomText>
                    <ItemDetailText label="Description" text={request?.availableItem?.description} />
                    <ItemDetailText label="Condition" text={request?.availableItem?.Condition?.name} />
                    <ItemDetailText label="Category" text={request?.availableItem?.Category?.name} />
                    <CustomButton text="Chat" onPress={handleChat} />
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

export default RequsetDetailScreen;