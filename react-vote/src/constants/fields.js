import * as yup from 'yup';
//

export const signUpfields = [

    { label: "Username", type: "text", name: "username", placeholder: "Enter Username" },  // Add this line
    { label: "Email", type: "email", name: "email", placeholder: "Enter Email" },
    { label: "Password", type: "password", name: "password", placeholder: "Enter Password" },
    { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "Enter Confirm Password" }
  ];
  
  

export const signInfields = [
  { label: "Email", type: "email", name: "email", placeholder: "Enter Email" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter Password" }
]

export const signupSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be less than 20 characters'),  // Add validation for username
  
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
  
  

export const updateField=[
  { label: "Name", type: "text", name: "name"},
  { label: "Address", type: "textarea", name: "address"},
  { label: "Phone Number", type: "text", name: "phoneNumber" }
]