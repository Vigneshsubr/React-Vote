import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormField from '../components/FormField';
import { signInSchema, signInfields } from '../constants/fields';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddLoginMutation } from '../redux/services/userApi';
import white from "../asserts/images/white.jpg";

const SignIn = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(signInSchema)
    });

    const [login] = useAddLoginMutation();

    useEffect(() => {
        sessionStorage.removeItem('Token');
        sessionStorage.removeItem('Name'); // Also remove the Name if needed
    }, []);
    

    const onSubmit = async (data) => {
        try {
            const result = await login(data);
            console.log("API Response: ", result); // Log the entire API response to verify
    
            if (result?.data?.statusCode === 200) {
                const token = result.data.accessToken;
                const name = result.data.name || "Guest"; // Get the name from the response
    
                // Store both token and name in sessionStorage
                sessionStorage.setItem('Token', token);
                sessionStorage.setItem('Name', name); // Store the name
    
                toast.success("Login successful!", { autoClose: 500 });
    
                setTimeout(() => {
                    navigate('/dashboard/getvoters');
                }, 1500);
                reset();
            } else {
                const errorMessage = result.data.message || "Login failed. Please try again.";
                toast.error(errorMessage, { autoClose: 1500 });
            }
        } catch (error) {
            console.error("Error during login: ", error);
            toast.error("An error occurred during submission. Please try again.", { autoClose: 1500 });
        }
    };
    
    
    
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <ToastContainer />
            <div className="container-fluid d-flex h-100 mx-4 my-4 text-white shadow p-5 mb-5 mt-5 bg-body-tertiary rounded">
                {/* Left branding panel */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center" style={{ background: 'white' }}>
                    <h1 className="display-6 mb-3">My Vote My Rights</h1>
                    <img src={white} alt="Vote" className="img-fluid" style={{ maxWidth: "100%" }} />
                </div>

                {/* Right form panel */}
                <div className="col-md-6 d-flex justify-content-center align-items-center bg-white">
                    <div className="card shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '400px' }}>
                        <h3 className="text-center mb-4">Sign In</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {signInfields.map((field, index) => (
                                <FormField
                                    key={index}
                                    field={field}
                                    register={register}
                                    errors={errors}
                                />
                            ))}

                            {/* Centered Create Account Button */}
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary col-8 mb-3" type="submit">
                                    Sign In
                                </button>
                            </div>

                            <div className="text-center">
                                <small className="text-muted">
                                    Way to 
                                    <span onClick={() => navigate('/signup')} style={{ cursor: "pointer", color: '#007bff' }}>
                                        &nbsp;Sign up
                                    </span>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
