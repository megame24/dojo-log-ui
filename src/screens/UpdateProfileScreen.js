import React from 'react';
import * as Yup from 'yup';

import useAuth from '../hooks/useAuth';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import BackButton from '../components/BackButton';
import ActivityIndicator from '../components/ActivityIndicator';
import Screen from '../components/Screen';
import Form from '../components/forms/Form';
import ErrorMessage from '../components/forms/ErrorMessage';
import FormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import useApi from '../hooks/useApi';
import usersApi from '../api/users';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(255).label('Name'),
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    )
    .label('Email'),
  username: Yup.string().min(2).max(255).label('Username '),
});

function UpdateProfileScreen({ navigation }) {
  const {
    user: { id, name, email, username },
    login,
  } = useAuth();
  const updateProfileApi = useApi(usersApi.updateProfile);

  const handleSubmit = async (userData) => {
    const { ok, data } = await updateProfileApi.request({ id, ...userData });

    if (!ok) return;

    const { authToken } = data;
    login(authToken);
    navigation.navigate(constants.PROFILE_SCREEN);
  };

  return (
    <>
      <ScreenHeader
        header={constants.UPDATE_PROFILE_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={updateProfileApi.loading} />
      <Screen screenHeaderPresent scrollable>
        <Form
          initialValues={{ name, email, username }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={updateProfileApi.error}
            visible={!!updateProfileApi.error}
          />
          <FormField name="name" label="Name" autoCorrect={false} />
          <FormField
            name="email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            label="Email"
            autoCorrect={false}
          />
          <FormField
            name="username"
            label="Username"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <SubmitButton title="Save" />
        </Form>
      </Screen>
    </>
  );
}

export default UpdateProfileScreen;
