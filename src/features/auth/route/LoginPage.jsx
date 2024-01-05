import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../api/client";
import Swal from "sweetalert2";
import { useAuth } from "../api/Auth";

const LoginPage = () => {
  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here, such as API calls or other actions.

    try {
      const { data, error } = await login(formData.email, formData.password);

      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Login success",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ooops, something went wrong",
        text: error,
      });
    }

    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-semibold mb-6 text-center">Welcome to VM</h1>
      <div className="flex items-center justify-center ">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
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
            <div className="mb-6">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-500 hover:underline">
              Register here
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
