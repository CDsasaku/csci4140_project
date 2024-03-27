import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react'
import g_THEME from '../../theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface IconButtonProps {
    onPress: () => void;
    icon: string;
    color?: string;
    size?: number;
    backgroundColor?: string;
    width?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress, icon, size, color, backgroundColor, width }) => {
    

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 20,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor ?? 'transparent',
    },
});

return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container} >
                <MaterialIcons name={icon} size={size ? size : 30} color={color ? color : g_THEME.colors.secondary} />
            </View>
        </TouchableOpacity>
    );
};

export default IconButton;
