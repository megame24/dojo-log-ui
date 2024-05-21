import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../AppText';
import ImageUpload from '../ImageUpload';

function ImageUploadFormField({ imageData, setImageData, deleteImage }) {
  return (
    <View style={styles.proofOfWorkContainer}>
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Image of reward</AppText>
        <AppText style={styles.subLabel}>(optional)</AppText>
      </View>
      <ImageUpload
        imageData={imageData}
        setImageData={setImageData}
        deleteImage={deleteImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    marginRight: 5,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  proofOfWorkContainer: {
    marginTop: 20,
  },
  subLabel: {
    fontStyle: 'italic',
    fontWeight: '200',
    fontSize: 14,
    marginRight: 5,
  },
});

export default ImageUploadFormField;
