import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import AppText from './AppText';
import Button from './Button';
import ErrorMessage from './forms/ErrorMessage';
import Icon from './Icon';
import colors from '../config/colors';

function FileUpload({ style, fileData, setFileData, setFile, deleteFile }) {
  const [fileSizeLimitError, setFileSizeLimitError] = useState('');

  const pickDocument = async () => {
    setFileSizeLimitError('');
    try {
      // check size (free plan should have an arbitrary size limit)
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
      });
      if (result.type === 'success') {
        if (result.size > 5000000) {
          setFileSizeLimitError('File size limit exceeded');
          return;
        }
        setFileData(result);
        const content = await FileSystem.readAsStringAsync(result.uri, {
          encoding: 'base64',
        });
        setFile(content);
      }
    } catch (error) {
      console.log(error); // handle better
    }
  };

  return (
    <View style={style}>
      {fileData?.name && (
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
      )}
      <Button
        outline
        style={styles.uploadButton}
        onPress={pickDocument}
        subText="size limit (5mb max)"
        Icon={() => (
          <Icon name="cloud-upload-outline" size={30} color={colors.primary} />
        )}
      >
        Choose a file
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

export default FileUpload;
