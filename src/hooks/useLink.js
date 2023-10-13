import { Linking } from 'react-native';

function useLink() {
  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  return { openLink };
}

export default useLink;
