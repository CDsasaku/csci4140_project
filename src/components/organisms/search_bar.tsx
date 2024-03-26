import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import TextField from '../molecules/text_field';
import g_THEME from '../../theme/theme';

interface SearchBarProps {
    text: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ text }) => {

    return (
        <View style={styles.container}>
            <TextField
                text={text}
                backgroundColor={g_THEME.colors.lightGrey}
                textColor={g_THEME.colors.greyGreen}
                borderColor='transparent'
                suffixIcon='search'
                suffixIconColor={g_THEME.colors.primary}
                >

            </TextField>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    });


export default SearchBar;