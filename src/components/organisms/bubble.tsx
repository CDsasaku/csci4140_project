import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import g_THEME from '../../theme/theme';
import { Message } from '../../models/message';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';

interface BubbleProps {
    text: string;
    message: Message;
}

const Bubble: React.FC<BubbleProps> = ({ text, message }) => {
    const { user } = useSelector(userSelector);

    return (
        <View style={message.uid == user?.uid ? styles.fromMeBubble : styles.fromOtherBubble}>
            <CustomText color={g_THEME.colors.white}>{text}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    fromMeBubble: {
        backgroundColor: g_THEME.colors.blue,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        maxWidth: screenWidth * 0.7,
        alignSelf: 'flex-end',
    },
    fromOtherBubble: {
        backgroundColor: g_THEME.colors.primary,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        maxWidth: screenWidth * 0.7,
        alignSelf: 'flex-start',
    },
});


export default Bubble;