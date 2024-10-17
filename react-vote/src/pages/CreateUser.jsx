import React, { useState } from 'react';
import { usePostUsersMutation } from '../redux/services/voterApi'; // Adjust the import path based on your project structure

const CreateUser = () => {
    // State to manage form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        address: '',
        profile_Image: null // Adjusted the name to match backend expectation
    });

    // Use the mutation hook to create a new user
    const [postUser, { isLoading, isSuccess, isError, error }] = usePostUsersMutation();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle image file input changes
    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            profile_Image: e.target.files[0] // Adjusted the name to 'profile_Image'
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data to handle image upload along with other fields
        const newUserFormData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                newUserFormData.append(key, formData[key]);
            }
        });

        try {
            await postUser(newUserFormData); // Pass formData to the mutation
            alert("User created successfully!");

            // Clear form fields after submission
            setFormData({
                name: '',
                email: '',
                password: '',
                gender: '',
                age: '',
                address: '',
                profile_Image: null
            });
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Username */}
                <div className="form-group mb-3">
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="form-group mb-3">
                    <label htmlFor="gender">Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Age */}
                <div className="form-group mb-3">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        required
                    />
                </div>

                {/* Address */}
                <div className="form-group mb-3">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        required
                    />
                </div>

                {/* Profile Image */}
                <div className="form-group mb-3">
                    <label htmlFor="profile_Image">Profile Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="profile_Image"
                        name="profile_Image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create User'}
                </button>

                {/* Error and Success Messages */}
                {isError && <p className="text-danger mt-3">Error: {error.message}</p>}
                {isSuccess && <p className="text-success mt-3">User created successfully!</p>}
            </form>
        </div>
    );
};

export default CreateUser;
