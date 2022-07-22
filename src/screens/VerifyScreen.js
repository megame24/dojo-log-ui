import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppTextInput from '../components/AppTextInput';
import Button from '../components/Button';
import FormFooter from '../components/forms/FormFooter';
import FormHeader from '../components/forms/FormHeader';
import FormSubHeader from '../components/forms/FormSubHeader';
import Screen from '../components/Screen';
import constants from '../config/constants';
import usersApi from '../api/users';
import useAuth from '../auth/useAuth';
import ActivityIndicator from '../components/ActivityIndicator';
import ErrorMessage from '../components/forms/ErrorMessage';
import useApi from '../hooks/useApi';

function VerifyScreen({ route, navigation }) {
  const { login } = useAuth();
  const verifyApi = useApi(usersApi.verifyUser);
  const resendCodeApi = useApi(usersApi.resendCode);
  const [verificationCodeObj, setVerificationCodeObj] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const { userId } = route.params;

  useEffect(() => {
    const verificationCodeObjValues = Object.values(verificationCodeObj);
    verificationCodeObjValues.forEach((value, index) => {
      if (!value) {
        return setSubmitButtonDisabled(true);
      }
      if (index === verificationCodeObjValues.length - 1)
        setSubmitButtonDisabled(false);
    });
  }, [verificationCodeObj]);

  const handleSubmit = async () => {
    let verificationCode = '';
    Object.values(verificationCodeObj).forEach((value) => {
      verificationCode += value;
    });
    const { ok, data } = await verifyApi.request(
      { code: verificationCode },
      userId
    );

    if (!ok) return;

    const { authToken } = data;
    login(authToken);
  };

  const resendCode = async () => {
    // implement wait time after each click!!!
    await resendCodeApi.request(userId);

    // display an auto disappearing success message!!!
  };

  return (
    <>
      <ActivityIndicator visible={verifyApi.loading || resendCodeApi.loading} />
      <Screen>
        <FormHeader>Verification</FormHeader>
        <ErrorMessage
          error={verifyApi.error || resendCodeApi.error}
          visible={!!(verifyApi.error || resendCodeApi.error)}
        />
        <FormSubHeader>
          Kindly enter the verification code we sent to your email.
        </FormSubHeader>
        <View style={styles.codesContainer}>
          <AppTextInput
            inputStyle={styles.textInput}
            inputContainerStyle={styles.textInputContainer}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={1}
            ref={firstInput}
            onChangeText={(text) => {
              setVerificationCodeObj({ ...verificationCodeObj, 1: text });
              text && secondInput.current.focus();
            }}
          />
          <AppTextInput
            inputStyle={styles.textInput}
            inputContainerStyle={styles.textInputContainer}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={1}
            ref={secondInput}
            onChangeText={(text) => {
              setVerificationCodeObj({ ...verificationCodeObj, 2: text });
              if (text) thirdInput.current.focus();
              else firstInput.current.focus();
            }}
          />
          <AppTextInput
            inputStyle={styles.textInput}
            inputContainerStyle={styles.textInputContainer}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={1}
            ref={thirdInput}
            onChangeText={(text) => {
              setVerificationCodeObj({ ...verificationCodeObj, 3: text });
              if (text) fourthInput.current.focus();
              else secondInput.current.focus();
            }}
          />
          <AppTextInput
            inputStyle={styles.textInput}
            inputContainerStyle={styles.textInputContainer}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={1}
            ref={fourthInput}
            onChangeText={(text) => {
              setVerificationCodeObj({ ...verificationCodeObj, 4: text });
              !text && thirdInput.current.focus();
            }}
          />
        </View>
        <Button
          disabled={submitButtonDisabled}
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <Text>Verify</Text>
        </Button>
        <FormFooter
          message="Didn't receive the code?"
          linkText="Resend code"
          onLinkPress={resendCode}
        />
        <FormFooter
          linkText="Back to login"
          onLinkPress={() => navigation.navigate(constants.LOGIN_SCREEN)}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  codesContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputContainer: {
    width: '16%',
  },
  textInput: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 30,
  },
});

export default VerifyScreen;
