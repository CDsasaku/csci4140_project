import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react'
import g_THEME from '../../theme/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';

interface CustomButtonProps {
    onPress: () => void;
    text: string;
    color?: string;
    margin?: number;
    width?: string;
    borderRadius?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, text, color, margin, width, borderRadius }) => {
    const styles = StyleSheet.create({
        button: {
            borderRadius: borderRadius ?? 10,
            backgroundColor: color ?? g_THEME.colors.greyGreen,
            margin: margin ?? 5,
            width: width ?? "auto",
        },
    });

    return (
        <Button mode='contained' onPress={onPress} style={styles.button}>
            {text}
        </Button>
    );
};


export default CustomButton;
