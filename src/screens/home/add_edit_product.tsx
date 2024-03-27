import React, { useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../../components/atoms/text';
import { screenHeight } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import CustomButton from '../../components/atoms/button';
import TextField from '../../components/molecules/text_field';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import Container from '../../components/atoms/container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddOrEditProduct: React.FC<RootProps<'AddOrEditProduct'>> = (props) => {

    const { product_id } = props.route.params;
    const product = { name: 'Product 1', description: 'This is a product', price: 100 };
    const [condition, setCondition] = useState('new');

    const handleRadioChange = (value: string) => {
        setCondition(value);
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity>
                    <View style={styles.image}>
                        <MaterialIcons name="add-a-photo" size={24} color="black" />
                   </View>
                </TouchableOpacity>
                    
                {/* <Image source={require('../../assets/corgi.jpg')} style={styles.image} /> */}
                <View style={styles.bottomContainer}>
                    <CustomText size={18}>Name</CustomText>
                    <TextField text={product.name.toString()} />
                    <CustomText size={18}>Price</CustomText>
                    <TextField text={product.price.toString()} />
                    <CustomText size={18}>Description</CustomText>
                    <TextField  multiline text={product.description.toString()} />
                    <CustomText size={18}>Condition</CustomText>
                    <RadioButton.Group onValueChange={value => handleRadioChange(value)} value="new">
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="new" />
                            <CustomText size={18}>Brand New</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="asNew" />
                            <CustomText size={18}>As New</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="halfNew" />
                            <CustomText size={18}>Half New</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="old" />
                            <CustomText size={18}>Old</CustomText>
                        </View>
                    </RadioButton.Group>
                    <CustomText size={18}>Wish List</CustomText>
                    <TextField text="wished items" />
                    <CustomButton text="Save" color={g_THEME.colors.blue} onPress={() => { }} />
                    <CustomButton text="Delete" color={g_THEME.colors.error} onPress={() => { }} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: g_THEME.colors.secondary,
        height: screenHeight,
    },
    image: {
        width: '100%',
        height: screenHeight * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: g_THEME.colors.grey,
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        padding: 10,
    },
    bottomContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 15,
    },
    description: {
        flex: 1,
        marginVertical: 10,
    },
});

export default AddOrEditProduct;