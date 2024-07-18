import { useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';

function useSignInWithApple() {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      return credential;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return false;
    }
  };

  return { signIn, loading };
}

export default useSignInWithApple;
