import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import AppText from './AppText';
import Button from './Button';
import ErrorMessage from './forms/ErrorMessage';
import Icon from './Icon';
import colors from '../config/colors';

function ImageUpload({ style, imageData, setImageData, deleteImage }) {
  const [fileSizeLimitError, setFileSizeLimitError] = useState('');

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          alert('Sorry, we need these permissions to proceed');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    setFileSizeLimitError('');
    try {
      // check size (free plan should have an arbitrary size limit)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });
      const asset = result.assets[0];

      if (!result.canceled) {
        if (asset.fileSize > 5000000) {
          setFileSizeLimitError(
            'File size limit exceeded, file must be 5mb or less'
          );
          return;
        }
        if (!asset.fileName) {
          const imageUriArr = asset.uri.split('/');
          asset.fileName = imageUriArr[imageUriArr.length - 1];

          const imageNameArr = asset.fileName.split('.');
          asset.mimeType = imageNameArr[imageNameArr.length - 1];
        }
        setImageData(asset);
      }
    } catch (error) {
      console.log(error); // handle better
    }
  };

  return (
    <View style={style}>
      {imageData && (
        <View style={styles.fileContainer}>
          <View style={styles.fileNameIcon}>
            <Image
              source={{ uri: imageData.uri }}
              style={{ width: 40, height: 40 }}
            />
            <AppText style={styles.fileName} numberOfLines={1}>
              {imageData.fileName}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={deleteImage}
            style={styles.fileDeleteContainer}
          >
            <AppText style={styles.fileDelete}>Delete</AppText>
          </TouchableOpacity>
        </View>
      )}
      <Button
        outline
        style={styles.uploadButton}
        onPress={pickImage}
        subText="size limit (5mb max)"
        Icon={() => (
          <Icon name="cloud-upload-outline" size={30} color={colors.primary} />
        )}
      >
        Choose an image
      </Button>
      <ErrorMessage
        style={styles.fileSizeLimitError}
        error={fileSizeLimitError}
        visible={!!fileSizeLimitError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fileContainer: {
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileNameIcon: { width: '80%', flexDirection: 'row', alignItems: 'center' },
  fileName: { marginLeft: 10, width: '85%' },
  fileDelete: { color: colors.primary, textAlign: 'right' },
  fileDeleteContainer: { width: '20%' },
  uploadButton: { marginTop: 10, height: 70, borderStyle: 'dashed' },
});

export default ImageUpload;
