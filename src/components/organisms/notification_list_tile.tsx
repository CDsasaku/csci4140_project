import React, { useState } from 'react';
import CustomText from '../atoms/text';
import { Image, StyleSheet, View } from 'react-native';
import g_THEME from '../../theme/theme';
import { formatDateTime } from '../../utils/format_datetime';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/slices/user_slice';
import IconButton from '../atoms/icon_button';
import { Notification } from '../../models/notification';

interface NotificationListProps {
    notification: Notification;
    onPress?: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notification, onPress }) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handlePress = () => {
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
            <View style={styles.textContainer} >
                <CustomText>{notification.content}</CustomText>
                <CustomText >{notification.createdAt && formatDateTime(notification.createdAt)}</CustomText>
            </View>

            <IconButton icon='close' color={g_THEME.colors.primary} onPress={() => { onPress && onPress(); }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 30,
        paddingRight: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: g_THEME.colors.secondary,
    },
    hoveredContainer: {
        backgroundColor: g_THEME.colors.grey,
        paddingLeft: 30,
        paddingRight: 10,
        paddingVertical: 10,
    },
    textContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});



export default NotificationList;