import React from 'react';
import {  StyleSheet, Text } from 'react-native';
import g_THEME from '../../theme/theme';

interface TextProps {
    children: React.ReactNode;
    size?: number;
    color?: string,
    textAlign?: 'center' | 'left' | 'right' | 'auto' | 'justify' | undefined;
    numberOfLines?: number;
    padding?: number;
    onPress?: () => void;
    focused?: boolean;
  }
  
const CustomText: React.FC<TextProps> = ({children, size, padding, color, textAlign, numberOfLines, onPress, focused=true}) => {

    const styles =  StyleSheet.create({
        text: {
            padding: padding || 0,
            fontSize: size,
            color: (!focused && g_THEME.colors.greyGreen) || color || 'black' ,
            textAlign: textAlign,
        },
    });

    return (
    <Text style={styles.text} numberOfLines={numberOfLines} onPress={onPress}>
        {children}
    </Text>
    );
};


export default CustomText;