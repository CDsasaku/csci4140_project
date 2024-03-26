import { View, StyleSheet } from "react-native";
import React from "react";

interface ColumnProps {
    children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ children }) => {
    return (
        <View style={styles.column}>
            {children}
        </View>
    );
}


const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
    },
});

export default Column;
