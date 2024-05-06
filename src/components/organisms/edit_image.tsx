import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {screenHeight, screenWidth} from '../../constants/screen_dimension';
import CustomText from '../atoms/text';
import g_THEME from '../../theme/theme';
import {API_ENDPOINT} from '../../api/apiConfig';
import {RequestStatus} from '../../constants/types';
import {Icon, Modal} from 'react-native-paper';
import {StackView} from '@react-navigation/stack';
import CustomButton from '../atoms/button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Asset} from 'react-native-image-picker';
import { openCamera, openGallery } from '../../utils/image_picker';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface EditImageProps {
  media: Asset | string | null;
  setMedia: (media: Asset | string | null) => void;
}

const EditImage: React.FC<EditImageProps> = ({media, setMedia}) => {
  const [isVisble, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState(
    {
        image: '',
        name: '',
        description: '',
        wishlist: '',
    }
);

  const handleImage = () => {
    setIsVisible(true);
    setError({ ...error, image: '' });
  }


  const handleTakePhoto = async () => {
    const media: Asset[] = await openCamera();
    setMedia(media[0]);
    setIsVisible(false);
  };

  const handleGallery = async () => {
    const media: Asset[] = await openGallery();
    setMedia(media[0]);
    setIsVisible(false);
  };

  const handleDeleteImage = () => {
    setMedia(null);
    setIsVisible(false);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.image} onPress={handleImage}>
          {media ? (
            <Image
              source={{
                uri:
                  typeof media == 'string' ? API_ENDPOINT + media : media.uri,
              }}
              style={styles.image}
            />
          ) : (
            <MaterialIcons name="add-a-photo" size={24} color="black" />
          )}
      </TouchableOpacity> 
      {/* <TouchableOpacity onPress={handleImage}>
        <View style={styles.image}>
          {media ? (
            <Image
              source={{
                uri:
                  typeof media == 'string' ? API_ENDPOINT + media : media.uri,
              }}
              style={styles.image}
            />
          ) : (
            <MaterialIcons name="add-a-photo" size={24} color="black" />
          )}
        </View>
      </TouchableOpacity> */}
      {error.image && (
        <CustomText size={16} color={g_THEME.colors.error}>
          {error.image}
        </CustomText>
      )} 
      <View style={{height: screenHeight, width: screenWidth, position: "absolute", }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: g_THEME.colors.secondary,
    height: screenHeight * 0.4,
  },

  modal: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: g_THEME.colors.grey,
    flex: 1,
  },
});

export default EditImage;
