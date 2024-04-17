import React, { useState } from 'react';
import { Conversation } from '../../models/conversation';
import CustomText from '../atoms/text';
import { Image, StyleSheet, View } from 'react-native';
import g_THEME from '../../theme/theme';
import { formatDateTime } from '../../utils/format_datetime';
import { useRouter } from 'next/router';

interface ConversationListProps {
    conversation: Conversation;
    onPress?: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({conversation, onPress}) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handlePress = () => {
        onPress && onPress();
        setIsHovered(false);
    };

    const containerStyle = [
        styles.container,
        isHovered && styles.hoveredContainer,
    ];

    return (
        <View
            style={containerStyle}
            onTouchStart={handleMouseEnter}
            onTouchEndCapture={handlePress}
            onTouchCancel={handleMouseLeave}
        >
            <Image source={require('../../assets/corgi.jpg')} style={styles.photo} />
            <View style={styles.textContainer} >
                <CustomText>{conversation.user1?.username}</CustomText>
                <CustomText>{conversation.Messages && conversation.Messages[0]?.content}</CustomText>
            </View>
            <CustomText>{conversation.Messages && conversation.Messages[0]?.createdAt && formatDateTime(conversation.Messages[0]?.createdAt)}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: g_THEME.colors.secondary,
    },
    hoveredContainer: {
        backgroundColor: g_THEME.colors.grey,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    textContainer: {
        flexDirection: 'column',
        paddingLeft: 10,
        flex: 1,
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});



export default ConversationList;