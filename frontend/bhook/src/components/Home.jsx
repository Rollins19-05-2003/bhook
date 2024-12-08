import { Link } from 'react-router-dom';
import scooty from "./../../public/scooty&logo.svg";
import home from "./../../public/home.svg"
const Home = () => {
    return (
      <div className="flex flex-col justify-center min-h-screen p-8 bg-white relative overflow-hidden">
        {/* Background Circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#3f3d56]"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#3f3d56]"></div>
        <div className="absolute left-12 -bottom-8 w-40 h-40 rounded-full bg-[#3f3d56]"></div>
  
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Brand Section */}
          <div className="space-y-8 lg:p-8 flex flex-col items-center">
            {/* Delivery Illustration */}
            <div className="lg:mt-12">
              <img 
                src={scooty} 
                alt="Delivery Illustration" 
                className="w-full max-w-md mx-auto object-contain"
              />
            </div>
            {/* Get Started Button */}
            <Link 
              to="/signup" 
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-[#3f3d56] rounded-md hover:bg-[#2d2b3f] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
  
          {/* App Showcase */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-8 lg:mt-0">
            <img 
              src={home}
              alt="App Splash Screen" 
              className="w-full max-w-[530px] rounded-3xl"
            />
          </div>
        </div>
      </div>
    )
  }
  
  export default Home