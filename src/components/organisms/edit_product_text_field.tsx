import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import TextField from '../molecules/text_field';
import g_THEME from '../../theme/theme';
import Container from '../atoms/container';
import CustomText from '../atoms/text';

interface EditProductTextFieldProps {
    label: string;
    text: string;
}
const EditProductTextField: React.FC<EditProductTextFieldProps> = ({label, text }) => {

    return (
        <View>
        <CustomText size={18}>{label}</CustomText>
        <Container backgroundColor={g_THEME.colors.secondary} radius={5} >
            <CustomText size={18}>{text}</CustomText>
        </Container></View>
    );
};


export default EditProductTextField;