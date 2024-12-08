import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import bhookLogo from '/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
const Navbar = ({ setIsAuthenticated }) => {
  const handleProfileClick = () => {
    console.log("Profile clicked");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setIsAuthenticated(false);
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0 flex items-center">
            <img
              className="h-12 w-auto"
              src={bhookLogo}
              alt="Bhook Logo"
            />
          </Link>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="text-gray-600 hover:text-gray-900 relative"
            >
              <FaShoppingCart className="h-6 w-6" />
              {/* Optional: Add cart items count */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={handleProfileClick}
            >
              <FaUserCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;