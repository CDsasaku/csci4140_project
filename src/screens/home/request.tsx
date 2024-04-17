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
import RequestText from '../../components/organisms/item_detail_text';
import { API_ENDPOINT } from '../../api/apiConfig';


const RequestScreen: React.FC<RootProps<'Request'>> = (props) => {

    const { itemId } = props.route.params;
    const item = useSelector(itemSelector).item;

    const dispatch: DispatchThunk = useDispatch();

    useEffect(() => {
    }, []);


    return (
        <ScrollView>
           
        </ScrollView>
    );
};

const styles = StyleSheet.create({
   
});

export default RequestScreen;