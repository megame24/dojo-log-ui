import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
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
