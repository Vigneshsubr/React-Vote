import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleUsersQuery,
  useUpdateUsersMutation,
} from "../redux/services/voterApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../components/Input";
import Button from "../components/Button"

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, isLoading, error } = useGetSingleUsersQuery(id);
  const [updateUsers, { isLoading: isUpdating }] = useUpdateUsersMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    age: "",
    address: "",
    gender: "",
    profileImage: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        age: user.age || "",
        address: user.address || "",
        gender: user.gender || "",
        profileImage: null,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedUserData.append(key, formData[key]);
    });

    try {
      await updateUsers({ id, updateUserData: updatedUserData }).unwrap();
      navigate(`/dashboard/userdetails/${id}`);
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed: " + (error.data?.message || "Unknown error"));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        Error fetching user details!
      </div>
    );
  }

  const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Age", name: "age", type: "number" },
    { label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-2 mt-4"
          size="lg"
          style={{ cursor: "pointer", color: "white" }}
          onClick={handleBack}
        />
        <h4 className="fst-italic mt-4 text-light">Update User</h4>
      </div>

      <div className="p-4 border rounded">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {formFields.map(({ label, name, type }) => (
            <div className="row mb-3" key={name}>
              <label
                htmlFor={name}
                className="col-sm-2 col-form-label text-light fw-bold"
              >
                {label}
              </label>
              <div className="col-sm-10">
                <Input
                  type={type}
                  className="form-control"
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          ))}

          <div className="row mb-3">
            <label
              htmlFor="gender"
              className="col-sm-2 col-form-label text-light fw-bold"
            >
              Gender
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="profileImage"
              className="col-sm-2 col-form-label text-light fw-bold"
            >
              Profile Image
            </label>
            <div className="col-sm-10">
              <Input
                type="file"
                className="form-control"
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="d-grid">
            <Button type="submit" className="btn btn-primary" disabled={isUpdating}>
              {isUpdating ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Updating...</span>
                </div>
              ) : (
                "Update User"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
