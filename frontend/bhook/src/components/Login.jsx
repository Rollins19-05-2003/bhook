import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const backendUrl = "https://bhook-backend.vercel.app/";

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${backendUrl}api/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        toast.success("Login successful", {position: "top-right"});
        // Redirect to dashboard or home after successful login
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error(errorData.message, {position: "top-right"});
        // Handle error - you might want to show an error message to the user
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("Network error", {position: "top-right"});
      // Handle network errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#3f3d56]"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#3f3d56]"></div>
      <div className="absolute left-12 -bottom-8 w-40 h-40 rounded-full bg-[#3f3d56]"></div>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-lg">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#3f3d56] focus:border-[#3f3d56] focus:z-10 text-lg"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#3f3d56] focus:border-[#3f3d56] focus:z-10 text-lg"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-[#3f3d56] hover:bg-[#2d2b3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f3d56] transition-colors duration-200"
            >
              LOGIN
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-[#3f3d56] hover:text-[#2d2b3f]">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right"/>
    </div>
  );
};

export default Login;