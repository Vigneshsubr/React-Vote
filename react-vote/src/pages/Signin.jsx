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
import vote from "../asserts/images/vote.jpg"; // Adjust the background image as needed

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
            console.log("API Response: ", result);

            if (result?.data?.statusCode === 200) {
                const token = result?.data?.data?.accessToken;
                console.log("Token received: ", token);

                if (token && typeof token === 'string') {
                    sessionStorage.setItem('Token', token);
                    console.log("Token stored in sessionStorage: ", sessionStorage.getItem('Token'));

                    try {
                        const decodedToken = jwtDecode(token);
                        console.log("Decoded Token: ", decodedToken);

                        const name = decodedToken?.Name || "Guest";
                        const role = decodedToken?.Role || "guest";
                        sessionStorage.setItem('Name', name);
                        toast.success("Login successful!", { autoClose: 500 });

                        setTimeout(() => {
                            if (role === 'VOTER') {
                                navigate('/dashboard/elections');
                            } else if (role === 'CANDIDATE' || role === 'ADMIN') {
                                navigate('/dashboard/vote');
                            } else {
                                toast.error("Unauthorized role");
                            }
                        }, 1500);

                        reset();
                    } catch (decodeError) {
                        console.error("Failed to decode token:", decodeError);
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
            console.error("Error during login: ", error);
            toast.error(error.message || "An error occurred during submission. Please try again.", { autoClose: 1500 });
        }
    };

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
                <h4 className="text-center mb-3">Sign In</h4>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-fields mb-2">
                        {signInfields.map((field, index) => (
                            <FormField key={index} field={field} register={register} errors={errors} />
                        ))}
                    </div>
        
                    {/* Centering the button */}
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary btn-sm col-8 mb-2" type="submit">Sign In</button>
                    </div>
        
                    <div className="text-center mt-2">
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
