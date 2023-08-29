import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import glossary from '../../config/glossary';
import InfoModalContext from '../../context/infoModalContext';
import AppText from '../AppText';
import Icon from '../Icon';
import ImageUpload from '../ImageUpload';

function ProofOfWorkFormField({ file, setFile, deleteFile }) {
  const { setInfoModalVisible, setInfoModalContent } =
    useContext(InfoModalContext);

  return (
    <View style={styles.proofOfWorkContainer}>
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Proof of work</AppText>
        <AppText style={styles.subLabel}>(optional)</AppText>
        <TouchableOpacity
          onPress={() => {
            setInfoModalContent(glossary.PROOF_OF_WORK);
            setInfoModalVisible(true);
          }}
        >
          <Icon name="help-circle-outline" size={16} color={colors.lightGray} />
        </TouchableOpacity>
      </View>
      <ImageUpload // explore making this a FileUpload in the future when the download functionality is smooth
        imageData={file}
        setImageData={setFile}
        deleteImage={deleteFile}
      />
      {/* <FileUpload file={file} setFile={setFile} deleteFile={deleteFile} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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

export default ProofOfWorkFormField;
