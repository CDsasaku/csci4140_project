import { View, StyleSheet } from "react-native";
import React from "react";

interface RowProps {
    children: React.ReactNode;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined;
}

const Row: React.FC<RowProps> = ({ children, justifyContent }) => {

    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            justifyContent: justifyContent,
        },
    });

    return (
        <View style={styles.row}>
            {children}
        </View>
    );
}

export default Row;
