import React from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Image, StyleSheet, View } from 'react-native';
import CustomText from '../../components/atoms/text';
import { screenHeight } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import CustomButton from '../../components/atoms/button';
import Container from '../../components/atoms/container';
import EditProductTextField from '../../components/organisms/edit_product_text_field';
import { ScrollView } from 'react-native-gesture-handler';

const ProductDetail: React.FC<RootProps<'ProductDetail'>> = (props) => {

    const { product_id } = props.route.params;
    const product = { name: 'Product 1', description: 'This is a product', price: 100 };

    return (
        <ScrollView style={styles.container}>
            <CustomText size={22}>Product Owner</CustomText>
            <View style={styles.innerContainer}>
                <Image source={require('../../assets/corgi.jpg')} style={styles.image} />
                <View style={styles.bottomContainer}>
                    <CustomText size={22}>{product.name}</CustomText>
                    <CustomText size={22}>${product.price}</CustomText>
                    <EditProductTextField label="Description" text={product.description} />
                    <EditProductTextField label="Condition" text="New" />
                    <EditProductTextField label="Wish List" text="None" />
                    <CustomButton text="Chat" onPress={() => { }} />
                    <CustomButton text="Request" color={g_THEME.colors.blue} onPress={() => { }} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: g_THEME.colors.secondary,
        height: screenHeight,
    },
    image: {
        width: '100%',
        height: screenHeight * 0.4,
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 5,
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

export default ProductDetail;