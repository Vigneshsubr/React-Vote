import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAddSignUpUsersMutation } from "../redux/services/userApi";
import { useNavigate } from "react-router-dom";
import { signupSchema, signUpfields } from "../constants/fields"; 
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from "../components/FormField"; 
import vote from "../asserts/images/vote.jpg"; // You can replace this with another image if desired

const SignUp = () => {
    const [signup] = useAddSignUpUsersMutation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const [step, setStep] = useState(1);

    const onSubmit = async (data) => {
        try {
            const { confirmPassword, ...formData } = data;
            await signup(formData).unwrap();
            toast.success("SignUp done Successfully", {
                autoClose: 1000, // Show toast for 1.5 seconds
                onClose: () => navigate('/signin') // Navigate after toast is closed
            });
            reset();
        } catch (error) {
            console.error("Error during signup:", error);
            const errorMessage = error?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage, { autoClose: 1500 });
        }
    };

    // Handle Next and Previous buttons
    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // Divide the fields into three steps (2 fields per step)
    const stepFields = [
        signUpfields.slice(0, 2),   // Step 1 - First two fields
        signUpfields.slice(2, 4),   // Step 2 - Next two fields
        signUpfields.slice(4)       // Step 3 - Remaining fields
    ];

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ 
            backgroundImage: `url(${vote})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden' 
        }}>
            <ToastContainer />
            <div className="card p-3 shadow" style={{ maxWidth: '450px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <h4 className="text-center mb-3">Sign Up</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-fields mb-2">
                        {/* Stepper navigation */}
                        <div className="stepper">
                            <div className="step" style={{ backgroundColor: step === 1 ? "#007bff" : "#e9ecef" }}></div>
                            <div className="step" style={{ backgroundColor: step === 2 ? "#007bff" : "#e9ecef" }}></div>
                            <div className="step" style={{ backgroundColor: step === 3 ? "#007bff" : "#e9ecef" }}></div>
                        </div>

                        {/* Render fields based on the current step */}
                        {stepFields[step - 1].map((field, index) => (
                            <FormField
                                key={index}
                                field={field}
                                register={register}
                                errors={errors}
                            />
                        ))}

                        {/* Step 1 - Role Selection */}
                        {step === 1 && (
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
                                </select>
                                {errors.role && <span className="text-danger">Role is required.</span>}
                            </div>
                        )}

                        {/* Terms and conditions - only on last step */}
                        {step === 3 && (
                            <div className="form-group mb-3 mt-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" {...register("terms", { required: true })} />
                                    <label className="form-check-label">
                                        By creating an account, you agree to our terms and privacy policy.
                                    </label>
                                </div>
                                {errors.terms && <span className="text-danger">You must agree to the terms.</span>}
                            </div>
                        )}
                    </div>

                    {/* Step navigation buttons */}
                    <div className="d-flex justify-content-between">
                        {step > 1 && (
                            <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                                Previous
                            </button>
                        )}
                        {step < 3 ? (
                            <button type="button" className="btn btn-primary" onClick={handleNext}>
                                Next
                            </button>
                        ) : (
                            <button className="btn btn-primary" type="submit">
                                Create Account
                            </button>
                        )}
                    </div>

                    {/* Redirect to Sign In */}
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
    );
};

export default SignUp;
