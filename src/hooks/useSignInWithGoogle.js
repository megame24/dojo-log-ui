import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  offlineAccess: false,
});

function useSignInWithGoogle() {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      return userInfo;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { signIn };
}

export default useSignInWithGoogle;
