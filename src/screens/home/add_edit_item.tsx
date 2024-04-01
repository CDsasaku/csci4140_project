import React, { useEffect, useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../../components/atoms/text';
import { screenHeight } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import CustomButton from '../../components/atoms/button';
import TextField from '../../components/molecules/text_field';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { itemSelector } from '../../redux/slices/item_slice';
import { Item } from '../../models/item';

const AddOrEditItem: React.FC<RootProps<'AddOrEditItem'>> = (props) => {

    const { isEdit } = props.route.params;
    const rItem = useSelector(itemSelector).item;

    const [item, setItem] = useState<Item | null>();
    const [condition, setCondition] = useState<string>(rItem?.Condition?.value ?? "new");

    useEffect(() => {
        if (isEdit) {
            setItem(rItem);
            
        }
    }, []);

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
                    <TextField text={item?.name ?? ""} />
                    <CustomText size={18}>Description</CustomText>
                    <TextField  multiline text={item?.description ?? ""} />
                    <CustomText size={18}>Condition</CustomText>
                    <RadioButton.Group onValueChange={value => handleRadioChange(value)} value={condition}>
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
                    <TextField text={item?.wishlist ?? ""} />
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

export default AddOrEditItem;