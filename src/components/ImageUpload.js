import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

import AppText from './AppText';
import Button from './Button';
import ErrorMessage from './forms/ErrorMessage';
import Icon from './Icon';
import colors from '../config/colors';

function ImageUpload({ style, fileData, setFileData, setFile, deleteFile }) {
  const [fileSizeLimitError, setFileSizeLimitError] = useState('');
  const [imageUri, setImageUri] = useState('');

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
        quality: 0.5,
      });
      console.log(result);

      if (!result.cancelled) {
        // setFileData(result);
        setImageUri(result.uri);

        // investigate how to make this work!!!
        // const response = await fetch(result.uri);
        // const blob = await response.blob();
        // console.log(blob)

        // I don't think this works as expected
        // const content = await FileSystem.readAsStringAsync(result.uri, {
        //   encoding: 'base64',
        // });
        // setFile(content);
      }
    } catch (error) {
      console.log(error); // handle better
    }
  };

  return (
    <View style={style}>
      {/* {fileData?.name && (
        <View style={styles.fileContainer}>
          <View style={styles.fileNameIcon}>
            <Icon name="document" color={colors.primary} />
            <AppText style={styles.fileName} numberOfLines={1}>
              {fileData.name}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={deleteFile}
            style={styles.fileDeleteContainer}
          >
            <AppText style={styles.fileDelete}>Delete</AppText>
          </TouchableOpacity>
        </View>
      )} */}
      {!!imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 50, height: 50 }} />
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
  },
  fileNameIcon: { width: '80%', flexDirection: 'row' },
  fileName: { marginLeft: 10, width: '85%' },
  fileDelete: { color: colors.primary, textAlign: 'right' },
  fileDeleteContainer: { width: '20%' },
  uploadButton: { marginTop: 10, height: 70, borderStyle: 'dashed' },
});

export default ImageUpload;
