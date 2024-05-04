import React, { useEffect, useState } from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../../components/atoms/text';
import { screenHeight } from '../../constants/screen_dimension';
import g_THEME from '../../theme/theme';
import CustomButton from '../../components/atoms/button';
import TextField from '../../components/molecules/text_field';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, RadioButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { itemSelector } from '../../redux/slices/item_slice';
import { Item } from '../../models/item';
import { Asset } from 'react-native-image-picker';
import { openCamera, openGallery } from '../../utils/image_picker';
import { DispatchThunk } from '../../redux/store/store';
import itemAction from '../../redux/actions/item_actions';
import { API_ENDPOINT } from '../../api/apiConfig';
import { navigateBackTwoPages } from '../../navigations/navigation_service';
import RNPickerSelect from 'react-native-picker-select';
import { userSelector } from '../../redux/slices/user_slice';

const AddOrEditItem: React.FC<RootProps<'AddOrEditItem'>> = (props) => {

    const { isEdit } = props.route.params;
    const rItem = useSelector(itemSelector).item;
    const categories = useSelector(itemSelector).categories;
    const dispatch: DispatchThunk = useDispatch();
    const { user } = useSelector(userSelector);

    const [item, setItem] = useState<Item | null>();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [condition, setCondition] = useState<string>("brand_new");
    const [categoryId, setCategoryId] = useState<number>(1);
    const [wishlist, setWishlist] = useState<string>("");
    const [media, setMedia] = useState<Asset | string | null>(null);
    const [isVisble, setIsVisible] = useState<boolean>(false);
    const [error, setError] = useState(
        {
            image: '',
            name: '',
            description: '',
            wishlist: '',
        }
    );

    useEffect(() => {
        if (isEdit) {
            setItem(rItem);
            setName(rItem?.name ?? "");
            setDescription(rItem?.description ?? "");
            setCondition(rItem?.Condition?.value ?? "brand_new");
            setCategoryId(rItem?.categoryId ?? 1);
            setWishlist(rItem?.wishlist ?? "");
            setMedia(rItem?.image ?? null);
        }
    }, []);

    const handleNameChange = (value: string) => {
        setName(value);
    }

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    }

    const handleRadioChange = (value: string) => {
        setCondition(value);
    }

    const handleCategoryChange = (value: number) => {
        setCategoryId(value);
    }

    const handleWishlistChange = (value: string) => {
        setWishlist(value);
    }

    const handleTakePhoto = async () => {
        const media: Asset[] = await openCamera();
        setMedia(media[0]);
        setIsVisible(false);
    }

    const handleGallery = async () => {
        const media: Asset[] = await openGallery();
        setMedia(media[0]);
        setIsVisible(false);
    }

    const handleDeleteImage = () => {
        setMedia(null);
        setIsVisible(false);
    }

    const handleImage = () => {
        setIsVisible(true);
        setError({ ...error, image: '' });
    }

    const handleSave = () => {
        if (media == null) {
            setError({ ...error, image: 'Please select an image' });
            return;
        } else if (name == null || name == '') {
            setError({ ...error, name: 'Please enter a name' });
            return;
        } else if (description == null || description == '') {
            setError({ ...error, description: 'Please enter a description' });
            return;
        } else if (wishlist == null || wishlist == '') {
            setError({ ...error, wishlist: 'Please enter a wishlist' });
            return;
        } else {
            setError({ ...error, image: '', name: '', description: '', wishlist: '' });
        }

        if (isEdit) {
            if (item == null) return;
            if (typeof (media) == "string")
                dispatch(itemAction.updateItem(item?.id, name, description, condition, categoryId, item?.uid, wishlist));
            else
                dispatch(itemAction.updateItem(item?.id, name, description, condition, categoryId, item?.uid, wishlist, media as Asset));
        } else {
            user && dispatch(itemAction.createItem(name, description, condition, categoryId, media as Asset, user?.uid, wishlist));
        }
    }

    const handleDeleteItem = () => {
        if (item == null) return;
        dispatch(itemAction.deleteItem(item.id));
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={handleImage}>
                    <View style={styles.image}>
                        {media ? <Image source={{ uri: typeof (media) == "string" ? API_ENDPOINT + media : media.uri }} style={styles.image} /> :
                            <MaterialIcons name="add-a-photo" size={24} color="black" />
                        }
                    </View>
                </TouchableOpacity>
                {error.image && <CustomText size={16} color={g_THEME.colors.error}>{error.image}</CustomText>}

                <View style={styles.bottomContainer}>
                    <CustomText size={18}>Name</CustomText>
                    <TextField text={name} error={error.name} onChange={handleNameChange} />
                    <CustomText size={18}>Description</CustomText>
                    <TextField multiline text={description} error={error.description} onChange={handleDescriptionChange} />
                    <CustomText size={18}>Condition</CustomText>
                    <RadioButton.Group onValueChange={value => handleRadioChange(value)} value={condition}>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="brand_new" />
                            <CustomText size={18}>Brand New</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="as_new" />
                            <CustomText size={18}>As New</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="half_new" />
                            <CustomText size={18}>Half New</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <RadioButton value="old" />
                            <CustomText size={18}>Old</CustomText>
                        </View>
                    </RadioButton.Group>
                    <CustomText size={18}>Category</CustomText>
                    <RNPickerSelect
                        placeholder={categoryId != null ? {label: item?.Category?.name ?? '', value: item?.Category?.id} : { label: 'Select a category', value: null }}
                        items={categories.map((category) => ({ label: category.name, value: category.id, key: category.id}))}
                        onValueChange={(value) => handleCategoryChange(value)}
                        style={{ inputAndroid: { color: 'black' } }}
                    />
                    <CustomText size={18}>Wish List</CustomText>
                    <TextField text={wishlist} error={error.wishlist} onChange={handleWishlistChange} />
                    <CustomButton text="Save" color={g_THEME.colors.blue} onPress={handleSave} />
                    {isEdit && <CustomButton text="Delete" color={g_THEME.colors.error} onPress={handleDeleteItem} />}
                </View>
            </View>
            <Modal visible={isVisble} onDismiss={() => setIsVisible(false)} >
                <View style={styles.modal}>
                    <TouchableOpacity onPress={handleGallery}>
                        <CustomText size={18}>Gallery</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTakePhoto()}>
                        <CustomText size={18}>Take Photo</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteImage()}>
                        <CustomText size={18} color={g_THEME.colors.error}>Delete Image</CustomText>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    modal: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
});

export default AddOrEditItem;