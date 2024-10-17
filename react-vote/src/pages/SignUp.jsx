// components/SignUp.js

import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAddSignUpUsersMutation } from "../redux/services/userApi";
import { useNavigate } from "react-router-dom";
import { signupSchema, signUpfields } from "../constants/fields"; 
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from "../components/FormField"; 
import white from "../asserts/images/white.jpg"; 

const SignUp = () => {
    const [signup] = useAddSignUpUsersMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            const { confirmPassword, ...formData } = data; // Exclude confirmPassword
            await signup(formData).unwrap(); // Use unwrap to handle the promise directly
            toast.success("SignUp done Successfully", { autoClose: 500 });
            reset();
            navigate('/signin'); // Redirect after signup
        } catch (error) {
            console.error("Error during signup:", error); // Log the entire error object
            const errorMessage = error?.data?.message || "An error occurred. Please try again."; // Extract error message
            toast.error(errorMessage, { autoClose: 1500 });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <ToastContainer />
            <div className="container-fluid d-flex h-100 mx-4 my-4 text-white shadow p-5 mb-5 mt-5 bg-body-tertiary rounded">
                {/* Left Branding Panel */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center" style={{ background: 'white' }}>
                    <h1 className="display-6 mb-3">My Vote My Rights</h1>
                    <img src={white} alt="Vote" className="img-fluid" style={{ maxWidth: "100%" }} />
                </div>

                {/* Right Form Panel */}
                <div className="col-md-6 d-flex justify-content-center align-items-center bg-white">
                    <div className="card shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '400px' }}>
                        <h3 className="text-center mb-4">Sign Up</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Role Selection */}
                            <div className="form-group mb-3">
                                <label htmlFor="role" className="form-label">Select Role</label>
                                <select
                                    id="role"
                                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                    {...register("role", { required: true })}
                                >
                                    <option value="">Choose your role...</option>
                                    <option value="VOTER">Voter</option>
                                    <option value="CANDIDATE">Candidate</option>
                                    <option value="ADMIN">Admin</option>
                                    {/* Add more roles as needed */}
                                </select>
                                {errors.role && <span className="text-danger">Role is required.</span>}
                            </div>

                            {/* Other form fields */}
                            {signUpfields.map((field, index) => (
                                <FormField
                                    key={index}
                                    field={field}
                                    register={register}
                                    errors={errors}
                                />
                            ))}

                            <div className="form-group mb-3 mt-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" {...register("terms", { required: true })} />
                                    <label className="form-check-label">
                                        By creating an account, you agree to our terms and privacy policy.
                                    </label>
                                </div>
                                {errors.terms && <span className="text-danger">You must agree to the terms.</span>}
                            </div>

                            {/* Centered Create Account Button */}
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary col-8 mb-3" type="submit">
                                    Create Account
                                </button>
                            </div>

                            <div className="text-center">
                                <small className="text-muted">
                                    Already have an account?
                                    <span onClick={() => navigate('/signin')} style={{ cursor: "pointer", color: '#007bff' }}>
                                        &nbsp;Log In
                                    </span>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
