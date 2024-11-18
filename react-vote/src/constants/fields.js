import * as yup from 'yup';

export const signUpfields = [
  { label: "Name", type: "text", name: "name", placeholder: "Enter name" },
  { label: "Email", type: "email", name: "email", placeholder: "Enter Email" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter Password" },
  { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "Enter Confirm Password" },
  {
    label: "Gender",
    type: "select",
    name: "gender",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
    placeholder: "Select Gender"
  },
  { label: "Age", type: "number", name: "age", placeholder: "Enter Age" },
  { label: "Address", type: "text", name: "address", placeholder: "Enter Address" },
];



export const signInfields = [
  { label: "Email", type: "email", name: "email", placeholder: "Enter Email" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter Password" }
]

// constants/fields.js

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(20, 'Name must be less than 20 characters'),

  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Other'], 'Select a valid gender') // Capitalized values
    .required('Gender is required'),

    age: yup
    .number()
    .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value))
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .min(18, 'You must be at least 18 years old'),
  
  address: yup
    .string()
    .required('Address is required'),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});
