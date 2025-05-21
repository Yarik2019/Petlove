import * as Yup from 'yup';

const nameValid = Yup.string()
  .required('Name is required')
  .min(2, 'Minimum 2 symbols')
  .max(50, 'Maximum 50 symbols');

const emailValid = Yup.string()
  .required('Email is required')
  .matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    'Invalid email format'
  );

const avatarValid = Yup.string().matches(
  /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
  'Avatar must be a valid image URL'
);

const titleValid = Yup.string()
  .required('Title is required')
  .min(2, 'Minimum 2 symbols')
  .max(50, 'Maximum 50 symbols');

const avatarPetValid = Yup.string()
  .required('Pet Photo is required')
  .matches(
    /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
    'Pet Photo must be a valid image URL'
  );

const phoneValid = Yup.string()
  .required('Phone number is required')
  .matches(/^\+38\d{10}$/, 'Phone must be in format +380XXXXXXXXX')
  .required('Phone number is required');

const passwordValid = Yup.string()
  .required('Password is required')
  .min(7, 'Minimum 7 symbols')
  .max(50, 'Maximum 50 symbols');

export const orderRegistrationSchema = Yup.object({
  name: nameValid,
  email: emailValid,
  password: passwordValid,
  confirmPassword: Yup.string()
    .required('Confirm password required')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

export const orderLoginSchema = Yup.object({
  email: emailValid,
  password: passwordValid,
});

export const orderEditUserSchema = Yup.object({
  name: nameValid,
  email: emailValid,
  avatar: avatarValid,
  phone: phoneValid,
});

export const orderAddPetSchema = Yup.object({
  name: nameValid,
  title: titleValid,
  imgURL: avatarPetValid,
  species: Yup.string().required('Type of Pet is required'),
  birthday: Yup.string()
    .required('Birthday is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date format YYYY-MM-DD'),
  sex: Yup.string().required('Sex is required'),
});
