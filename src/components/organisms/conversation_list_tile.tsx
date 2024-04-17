import React, { useState } from 'react';
import { Conversation } from '../../models/conversation';
import CustomText from '../atoms/text';
import { Image, StyleSheet, View } from 'react-native';
import g_THEME from '../../theme/theme';

interface ConversationListProps {
    conversation: Conversation;
}

const ConversationList: React.FC<ConversationListProps> = ({conversation}) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
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
            onTouchEnd={handleMouseLeave}
        >
            <Image source={require('../../assets/corgi.jpg')} style={styles.photo} />
            <View style={styles.textContainer} >
                <CustomText>{conversation.user1?.username}</CustomText>
                <CustomText>{conversation.Messages && conversation.Messages[0]?.content}</CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    hoveredContainer: {
        backgroundColor: g_THEME.colors.grey,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    textContainer: {
        flexDirection: 'column',
        paddingLeft: 10,
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});



export default ConversationList;