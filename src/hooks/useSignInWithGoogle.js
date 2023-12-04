import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  // webClientId: '299187616976-27sta8o8v94fsm0b616343cbkvh8l245.apps.googleusercontent.com',
  iosClientId:
    '299187616976-gio7um9ebl2lc14bkhn20q731a98j06b.apps.googleusercontent.com',
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
