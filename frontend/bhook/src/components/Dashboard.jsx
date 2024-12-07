import { useState, useEffect } from 'react';
import { FaPizzaSlice, FaUtensils, FaCoffee, FaIceCream } from 'react-icons/fa';
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const backendUrl = "https://bhook-backend.vercel.app/";
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  // Dummy food data
  // const foodItems = [
  //   {
  //     id: 1,
  //     name: 'Vegan Chickpea Curry',
  //     price: 150,
  //     description: 'Loaded with protein',
  //     quantity: 5,
  //     image: 'path_to_image'
  //   },
  //   // Add more items as needed
  // ];

  const fetchFoodItems = async () => {
    const response = await fetch(`${backendUrl}api/v1/food`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    setFoodItems(data);
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello,
          <span className="block text-4xl mt-1">{user?.name || 'Guest'}</span>
        </h1>
        <p className="text-gray-600 mt-2">What do you want to eat?</p>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3f3d56]"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              �
            </span>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <CategoryCard icon={<FaPizzaSlice />} title="Lunch" />
          <CategoryCard icon={<FaUtensils />} title="Dinner" />
          <CategoryCard icon={<FaCoffee />} title="Breakfast" />
          <CategoryCard icon={<FaIceCream />} title="Dessert" />
        </div>

        {/* Admin Add Food Button */}
        {isAdmin && (
          <div className="mt-8">
            <button className="bg-[#3f3d56] text-white px-6 py-3 rounded-lg hover:bg-[#2d2b3f] transition-colors" onClick={() => navigate('/add-food')}>
              Add Food Item
            </button>
          </div>
        )}

        {/* Food Items Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Today's special</h2>
            <button className="text-[#3f3d56] hover:underline">See all</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <FoodCard 
                key={item.id} 
                food={item} 
                isAdmin={isAdmin} 
                setFoodItems={setFoodItems}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Card Component
const CategoryCard = ({ icon, title }) => (
  <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
    <div className="text-2xl mb-2">{icon}</div>
    <span className="text-sm font-medium">{title}</span>
  </div>
);

export default Dashboard;