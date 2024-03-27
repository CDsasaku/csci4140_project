import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import g_THEME from '../../theme/theme';

interface ContainerProps {
    children: React.ReactNode;
    radius?: number;
    backgroundColor?: string;
}

const Container: React.FC<ContainerProps> = ({ children, radius, backgroundColor }) => {

    const styles = StyleSheet.create({
        container: {
            borderRadius: radius ?? 10,
            backgroundColor: backgroundColor ?? g_THEME.colors.lightGrey,
        },
    });
    
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};


export default Container;