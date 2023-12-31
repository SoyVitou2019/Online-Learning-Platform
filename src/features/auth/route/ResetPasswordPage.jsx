import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../api/Auth";
import RouteError from "../../../components/RouteError";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { updatePassword, user } = useAuth();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*add validation */
    try {
      const { data, error } = await updatePassword(formData.password);
      console.log(data);
      console.log(error);
      if (error) throw error;

      Swal.fire({
        icon: "success",
        title: "Password updated successfully",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ooops, something went wrong",
        text: error,
      });
    }
  };

  // Add your logic for handling the forgot password request, such as sending a reset email.  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Welcome to VM
        </h1>
        <div className="flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Address */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
              >
                Reset Password
              </button>
            </form>

            <p className="text-gray-600 text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-blue-500 hover:underline"
              >
                Register here
              </Link>
            </p>

            {/* Forget Password Link */}
            <p className="text-gray-600 text-sm mt-2">
              Remember your password?{" "}
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Log in here
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
    </>
  );
};

export default ResetPasswordPage;
