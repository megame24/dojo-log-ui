import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId:
    '299187616976-gio7um9ebl2lc14bkhn20q731a98j06b.apps.googleusercontent.com',
  offlineAccess: true,
});

function useSignInWithGoogle() {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      return userInfo;

      // const response = await fetch('http://your-server-url/verify', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ idToken: userInfo.idToken }),
      // });

      // const data = await response.json();

      // if (data.success) {
      //   // User is verified successfully
      // } else {
      //   // Failed to verify user
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return { signIn };
}

export default useSignInWithGoogle;
