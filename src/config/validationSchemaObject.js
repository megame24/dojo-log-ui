import * as Yup from 'yup';

export default {
  name: Yup.string().required().min(2).max(255).label('Name'),
  email: Yup.string()
    .required()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    )
    .label('Email'),
  username: Yup.string().required().min(2).max(255).label('Username '),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!”#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]).{8,}$/,
      'Your password must be greater than 8 characters and must contain at least one uppercase letter, one lowercase letter, one number, and a special character'
    )
    .label('Password'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .label('Confirm Password'),
};
