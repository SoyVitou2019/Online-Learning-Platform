import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../api/client";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profileUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const isValidImageUrl = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return false;
      }

      const contentType = response.headers.get("content-type");
      return contentType.startsWith("image");
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your registration logic here, such as API calls or other actions.
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill out all the required fields",
      });
      return;
    }

    const isImage = await isValidImageUrl(formData.profileUrl);
    if (!isImage) {
      Swal.fire({
        icon: "error",
        title: "Invalid profile URL",
        text: "Please provide a valid image URL for the profile",
      });
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            profileUrl: formData.profileUrl,
            role: "student",
          },
        },
      });
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Please check your email",
      });

      navigate("/auth/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ooops, something went wrong",
        text: error,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-semibold mb-6 text-center">Welcome to VM</h1>
      <div className="flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Profile URL */}
            <div className="mb-6">
              <label
                htmlFor="profileUrl"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Profile URL
              </label>
              <input
                type="text"
                id="profileUrl"
                name="profileUrl"
                value={formData.profileUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              Register
            </button>

            <p className="text-gray-600 text-sm mt-4">
              Already registered?{" "}
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Log in here
              </Link>
            </p>

            {/* Forget Password Link */}
            <p className="text-gray-600 text-sm mt-2">
              Forgot your password?{" "}
              <Link
                to="/auth/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Reset it here
              </Link>
            </p>

            <p className="text-gray-600 text-md mt-4 text-center">
              <Link to="/" className="text-blue-500 hover:underline">
                Skip
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
