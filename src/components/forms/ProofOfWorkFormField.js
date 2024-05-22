import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import glossary from '../../config/glossary';
import InfoModalContext from '../../context/infoModalContext';
import AppText from '../AppText';
import ImageUpload from '../ImageUpload';
import InfoIcon from '../InfoIcon';

function ProofOfWorkFormField({ file, setFile, deleteFile }) {
  const { setInfoModalVisible, setInfoModalContent } =
    useContext(InfoModalContext);

  return (
    <View style={styles.proofOfWorkContainer}>
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Proof of work</AppText>
        <AppText style={styles.subLabel}>(optional)</AppText>
        <InfoIcon
          infoIconPress={() => {
            setInfoModalContent(glossary.PROOF_OF_WORK);
            setInfoModalVisible(true);
          }}
        />
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
