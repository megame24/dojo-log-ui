import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';

GoogleSignin.configure({
  webClientId:
    '931625271869-42o10kfcmb96544h7jp2an9mdp9rncv8.apps.googleusercontent.com',
  androidClientId:
    '931625271869-5ln5efrahfftsrl3g93p91q63jcuqc1d.apps.googleusercontent.com',
  offlineAccess: false,
});

function useSignInWithGoogle() {
  const [loading, setLoading] = useState(false);
  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setLoading(false);

      return userInfo;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return false;
    }
  };

  return { signIn, loading };
}

export default useSignInWithGoogle;
