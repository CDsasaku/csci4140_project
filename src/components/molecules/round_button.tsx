import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import Container from '../atoms/container';
import g_THEME from '../../theme/theme';

interface RoundButtonProps {
    text: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({ text }) => {

    return (
        <Container>
            <View style={styles.roundButton}>
                <CustomText>{text}</CustomText>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    roundButton: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        width: screenWidth * 0.17,
        height: screenWidth * 0.17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: g_THEME.colors.secondary,
    },
});


export default RoundButton;