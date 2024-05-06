import React, {useEffect, useState} from 'react';
import {RootProps} from '../../navigations/screen_navigation_props';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CustomText from '../../components/atoms/text';
import {DispatchThunk} from '../../redux/store/store';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '../../redux/slices/user_slice';
import {itemSelector} from '../../redux/slices/item_slice';
import itemAction from '../../redux/actions/item_actions';
import g_THEME from '../../theme/theme';
import Item from '../../components/organisms/item';
import IconButton from '../../components/atoms/icon_button';
import userAction from '../../redux/actions/user_actions';
import Row from '../../components/atoms/row';
import {Asset} from 'react-native-image-picker';
import {openCamera, openGallery} from '../../utils/image_picker';
import {API_ENDPOINT} from '../../api/apiConfig';
import {Modal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextField from '../../components/molecules/text_field';
import CustomButton from '../../components/atoms/button';
import { screenHeight } from '../../constants/screen_dimension';

const EditProfileScreen: React.FC<RootProps<'EditProfile'>> = props => {
  const {user} = useSelector(userSelector);
  const dispatch: DispatchThunk = useDispatch();
  const {username, email, uid, icon} = user || {}; // Add a default empty object if user is null

  const [iconMedia, setIconMedia] = useState<Asset | string | null>(
    icon ?? null,
  );
  const [updatedUsername, setUpdatedUsername] = useState<string>(
    username ?? '',
  );
  const [updatedEmail, setUpdatedEmail] = useState<string>(email ?? '');
  const [isVisble, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState({
    image: '',
    updatedUsername: '',
    updatedEmail: '',
  });

  const handleImage = () => {
    setIsVisible(true);
    setError({...error, image: ''});
  };

  const handleTakePhoto = async () => {
    const media: Asset[] = await openCamera();
    setIconMedia(media[0]);
    setIsVisible(false);
  };

  const handleGallery = async () => {
    const media: Asset[] = await openGallery();
    setIconMedia(media[0]);
    setIsVisible(false);
  };

  const handleDeleteImage = () => {
    setIconMedia(null);
    setIsVisible(false);
  };

  const handleSave = () => {
    if (iconMedia == null) {
      setError({...error, image: 'Please select an image'});
      return;
    } else if (updatedUsername == null || updatedUsername == '') {
      setError({...error, updatedUsername: 'Please enter a username'});
      return;
    } else if (updatedEmail == null || updatedEmail == '') {
      setError({...error, updatedEmail: 'Please enter a email'});
      return;
    } else {
      setError({...error, image: '', updatedUsername: '', updatedEmail: ''});
    }

    dispatch(
      userAction.updateUser(
        updatedUsername,
        updatedEmail,
        uid as number,
      ),
    );

    // if (item == null) return;
    // if (typeof iconMedia == 'string')
    //   dispatch(
    //     itemAction.updateItem(
    //       item?.id,
    //       updatedUsername,
    //       updatedEmail,
    //       condition,
    //       categoryId,
    //       item?.uid,
    //       wishlist,
    //     ),
    //   );
    // else
    //   dispatch(
    //     itemAction.updateItem(
    //       item?.id,
    //       updatedUsername,
    //       updatedEmail,
    //       condition,
    //       categoryId,
    //       item?.uid,
    //       wishlist,
    //       iconMedia as Asset,
    //     ),
    //   );
  };

  const handleUsernameChange = (text: string) => {
    setUpdatedUsername(text);
  };

  const handleEmailChange = (text: string) => {
    setUpdatedEmail(text);
  };

  return (
    <View style={styles.wholePage}>
      <TouchableOpacity onPress={handleImage}>
        <View style={styles.image}>
          {iconMedia ? (
            <Image
              source={{
                uri:
                  typeof iconMedia == 'string'
                    ? API_ENDPOINT + iconMedia
                    : iconMedia.uri,
              }}
              style={styles.image}
            />
          ) : (
            <MaterialIcons
              name="add-a-photo"
              size={24}
              color="black"
            />
          )}
        </View>
      </TouchableOpacity>
      {error.image && (
        <CustomText size={16} color={g_THEME.colors.error}>
          {error.image}
        </CustomText>
      )}
      <View style={styles.bottomContainer}>
        <CustomText size={18}>Username</CustomText>
        <TextField text={updatedUsername} error={error.updatedUsername} onChange={handleUsernameChange} />
        <CustomText size={18}>Email</CustomText>
        <TextField
          multiline
          text={updatedEmail}
          error={error.updatedEmail}
          onChange={handleEmailChange}
        />

        <CustomButton
          text="Save"
          color={g_THEME.colors.blue}
          onPress={handleSave}
        />
      </View>

      <Modal visible={isVisble} onDismiss={() => setIsVisible(false)}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={handleGallery}>
            <CustomText size={18}>Gallery</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTakePhoto()}>
            <CustomText size={18}>Take Photo</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteImage()}>
            <CustomText size={18} color={g_THEME.colors.error}>
              Delete Image
            </CustomText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    height: '100%',
    flex: 1,
    gap: 20,

  },
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

export default EditProfileScreen;
