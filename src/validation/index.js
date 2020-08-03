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
      'Special characters are not allowed',
    )
    .required('The first name is required.'),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
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
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The polish word is required.'),
  english: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    )
    .required('The english word is required.'),
});

export const noteSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too short.').max(25, 'Too long.').required('The title is required.'),
  content: Yup.string()
    .min(2, 'Too short.')
    .max(300, 'Too long.')
    .required('The content is required.'),
});

export const editProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email.'),
  password: Yup.string().min(8, 'Too short. Password must be at least 8 characters.'),
  firstName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    ),
  lastName: Yup.string()
    .min(2, 'Too short.')
    .max(25, 'Too long.')
    .trim()
    .matches(
      /^[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*((-|\s)*[_A-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])*$/g,
      'Special characters are not allowed',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Password doesn't match`)
    .required('You need to confirm your password.'),
});
