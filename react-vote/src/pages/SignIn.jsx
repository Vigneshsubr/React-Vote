import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormField from '../components/FormField';
import { signInSchema, signInfields } from '../constants/fields';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddLoginMutation } from '../redux/services/userApi';
import { jwtDecode } from 'jwt-decode';
import vote from "../asserts/images/handsign1.jpg"; // Adjust the background image as needed

const SignIn = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(signInSchema)
    });

    const [login] = useAddLoginMutation();

    useEffect(() => {
        sessionStorage.removeItem('Token');
        sessionStorage.removeItem('Name');
    }, []);

    const onSubmit = async (data) => {
        try {
            const result = await login(data);
            if (result?.data?.statusCode === 200) {
                const token = result?.data?.data?.accessToken;
                if (token && typeof token === 'string') {
                    sessionStorage.setItem('Token', token);
                    try {
                        const decodedToken = jwtDecode(token);
                        const name = decodedToken?.Name || "Guest";
                        const role = decodedToken?.Role || "guest";
                        sessionStorage.setItem('Name', name);
                        toast.success("Login successful!", { autoClose: 500 });
                        setTimeout(() => {
                            if (role === 'VOTER') {
                                navigate('/dashboard/pichart');
                            } else if (role === 'CANDIDATE' || role === 'ADMIN') {
                                navigate('/dashboard/pichart');
                            } else {
                                toast.error("Unauthorized role");
                            }
                        }, 1500);
                        reset();
                    } catch (decodeError) {
                        toast.error("Invalid token received.");
                    }
                } else {
                    throw new Error('Invalid token format or token is missing.');
                }
            } else {
                const errorMessage = result.data.message || "Login failed. Please try again.";
                toast.error(errorMessage, { autoClose: 1500 });
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during submission. Please try again.", { autoClose: 1500 });
        }
    };

    return (
        <div className="d-flex justify-content-end align-items-center vh-100" style={{ 
            position: 'relative',
            backgroundImage: `url(${vote})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            overflow: 'hidden' 
        }}>
            {/* Background overlay with opacity */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Adjust opacity here
                zIndex: 1
            }}></div>

            <ToastContainer />
            <div className="card p-3 me-5 shadow" style={{ 
                position: 'relative', 
                zIndex: 2, 
                maxWidth: '350px', 
                width: '100%', 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                marginRight: '20px' 
            }}>
                <h4 className="text-center mb-5">Sign In</h4>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-fields">
                        {signInfields.map((field, index) => (
                            <FormField key={index} field={field} register={register} errors={errors} />
                        ))}
                    </div>
                    
                    {/* Forgot Password */}
                    <div className="text-end mt-2">
                        <small>
                            <span onClick={() => navigate('/forgot-password')} className="text-primary" style={{ cursor: "pointer" }}>
                                Forgot Password?
                            </span>
                        </small>
                    </div>

                    {/* Centering the button */}
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary btn-sm col-8" type="submit">Sign In</button>
                    </div>

                    <div className="text-center mb-1 mt-2">
                        <small className="text-muted">
                            Don't have an account?
                            <span onClick={() => navigate('/signup')} className="text-primary" style={{ cursor: "pointer" }}>
                                &nbsp;Sign Up
                            </span>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
