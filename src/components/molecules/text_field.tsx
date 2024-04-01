import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import g_THEME from '../../theme/theme';
import { screenWidth } from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Container from '../atoms/container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../atoms/icon_button';

interface TextFieldProps {
    text: string;
    onChange?: (value: string) => void;
    hint?: string;
    onPress?: () => void;
    onPressText?: () => void;
    suffixIcon?: string;
    prefixIcon?: string;
    error?: string;
    secure?: boolean;
    numberOfLines?: number;
    suffixIconColor?: string;
    multiline?: boolean;
    keyboardType?: KeyboardTypeOptions;
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
}

const TextField: React.FC<TextFieldProps> = ({ text, onChange, hint, onPress, onPressText, suffixIcon, prefixIcon, error, secure, numberOfLines, suffixIconColor, multiline, keyboardType, borderColor, backgroundColor, textColor }) => {
    const [isSecure, setIsSecure] = useState(true);

    const handleInputChange = (text: string) => {
        if (onChange != null) {
            onChange(text);
        }
    };

    const handleSecureToggle = () => {
        setIsSecure(!isSecure);
    }

    const handleSuffixIcon = () => {
        if (onPress != null) {
            onPress();
        }
    }

    const handleText = () => {
        if (onPressText != null) {
            onPressText();
        }
    }

    const styles = StyleSheet.create({
        input: {
            width: prefixIcon && suffixIcon ? '80%' : secure || suffixIcon ? '90%' : '100%',
            paddingHorizontal: screenWidth * 0.05,
            fontSize: 18,
            color: textColor ?? 'black',
        },

        inputContainer: {
            flexDirection: 'row',
            width: '100%',
            fontSize: 18,
            borderRadius: 10,
            backgroundColor: backgroundColor ?? g_THEME.colors.white,
            borderColor: borderColor ?? g_THEME.colors.primary,
            borderWidth: 1,
            paddingLeft: prefixIcon ? 15 : 0,
        },
        prefix: {
            justifyContent: 'center',
        },
        suffix: {
            width: '10%',
            justifyContent: 'center',
        },
    });

    return (
        <View>
            <Container>
                <TouchableOpacity onPress={handleText}>
                    <View style={styles.inputContainer}>
                        {prefixIcon != null &&
                            <View style={styles.prefix}>
                                <MaterialIcons onPress={handleSuffixIcon} name={prefixIcon} color={'black'} size={24} />
                            </View>}
                        <TextInput
                            style={[styles.input]}
                            value={text}
                            onChangeText={handleInputChange}
                            placeholder={hint}
                            placeholderTextColor={'rgba(0, 0, 0, 0.21)'}
                            secureTextEntry={secure != null ? isSecure : false}
                            multiline={numberOfLines != null || multiline}
                            numberOfLines={numberOfLines ?? 1}
                            editable={onPressText == null}
                            keyboardType={keyboardType != null ? keyboardType : 'default'}
                        
                        />
                        {suffixIcon != null &&
                            <View style={styles.suffix}>
                                <IconButton onPress={handleSuffixIcon} icon={suffixIcon} color={suffixIconColor} size={24} />
                            </View>}
                        {secure != null &&
                            <View style={styles.suffix}>
                                <TouchableOpacity onPress={handleSecureToggle}>
                                    <Icon name={isSecure ? 'visibility' : 'visibility-off'} size={24} color={'grey'} />
                                </TouchableOpacity>
                            </View>}
                    </View>
                </TouchableOpacity>
            </Container>
            {error != null && error.length != 0 &&
                <View style={{ paddingLeft: 15 }}>
                    <CustomText color={g_THEME.colors.error} size={16}>{error}</CustomText>
                </View>}
        </View>
    );
};

export default TextField;