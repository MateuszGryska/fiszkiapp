import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string()
    .required('The passoword is required.')
    .min(8, 'Too short. Password must be at least 8 characters.'),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
  password: Yup.string()
    .required('The passoword is required.')
    .min(8, 'Too short. Password must be at least 8 characters.'),
  firstName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed.',
    )
    .required('The first name is required.'),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed.',
    )
    .required('The last name is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.'),
});

export const resetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.').required('The email is required.'),
});

export const wordSchema = Yup.object().shape({
  polish: Yup.string()
    .min(2, 'validation.too_short')
    .max(25, 'validation.too_long')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'validation.special_characters_not_allowed',
    )
    .required('validation.polish_required'),
  english: Yup.string()
    .min(2, 'validation.too_short')
    .max(25, 'validation.too_long')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'validation.special_characters_not_allowed',
    )
    .required('validation.english_required'),
  description: Yup.string().min(2, 'validation.too_short').max(100, 'validation.too_long'),
});

export const noteSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'validation.too_short')
    .max(25, 'validation.too_long')
    .required('validation.title_required'),
  content: Yup.string()
    .min(2, 'validation.too_short')
    .max(300, 'validation.too_long')
    .required('validation.content_required'),
});

export const editProfileSchema = Yup.object().shape({
  email: Yup.string().email('validation.email_invalid'),
  password: Yup.string().min(8, 'validation.password_minimum'),
  firstName: Yup.string()
    .min(2, 'validation.too_short')
    .max(25, 'validation.too_long')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'validation.special_characters_not_allowed',
    ),
  lastName: Yup.string()
    .min(2, 'validation.too_short')
    .max(25, 'validation.too_long')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'validation.special_characters_not_allowed',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'validation.password_not_match')
    .required('validation.password_confirm'),
});

export const MessageSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'validation.too_short')
    .max(25, 'validation.too_long')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'validation.special_characters_not_allowed',
    )
    .required('validation.name_required'),
  message: Yup.string()
    .min(2, 'validation.too_short')
    .max(300, 'validation.too_long')
    .required('validation.message_required'),
});
