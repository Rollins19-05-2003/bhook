import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPizzaSlice, FaLeaf, FaImage, FaRupeeSign, FaStar } from 'react-icons/fa';
import { MdFastfood, MdDescription, MdCategory } from 'react-icons/md';
import { BiDetail } from 'react-icons/bi';

const AddFoodForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const backendUrl = "https://bhook-backend.vercel.app/";
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isVeg: true,
    availableQuantity: '',
    restroId: '',
    details: '',
    image: '',
    discount: '0'
  });

  // Fetch food item details if id exists (edit mode)
  useEffect(() => {
    const fetchFoodItem = async () => {
      if (id) {
        try {
          const response = await fetch(`${backendUrl}api/v1/food/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (response.ok) {
            const {food} = await response.json();
            console.log(food);
            // Pre-fill the form with existing data
            setFormData({
              name: food.name,
              description: food.description,
              price: food.price,
              category: food.category,
              isVeg: food.isVeg,
              availableQuantity: food.availableQuantity,
              restroId: food.restroId,
              details: food.details || "",
              image: food.image || "",
              discount: food.discount || "0",
            });
          } else {
            toast.error('Failed to fetch food item details');
            navigate('/dashboard');
          }
        } catch (error) {
          toast.error('Error fetching food item details');
          navigate('/dashboard');
        }
      }
    };

    fetchFoodItem();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = id 
        ? `${backendUrl}api/v1/food/${id}` 
        : `${backendUrl}api/v1/food`;
      
      const method = id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(id ? 'Food item updated successfully!' : 'Food item added successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        toast.error(errorData.message || 'Failed to update food item');
      }
    } catch (error) {
      console.error('Request error:', error);
      toast.error('Error processing request');
    }
  };

  // Add this helper component for required field labels
  const RequiredLabel = ({ icon, text }) => (
    <label className="text-gray-700 font-medium mb-2 block flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {text}
      <span className="text-red-500 ml-1">*</span>
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <MdFastfood className="text-4xl text-[#3f3d56] mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">
            {id ? 'Edit Dish' : 'Add New Dish'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Restaurant ID Input - New Field */}
          <div className="relative">
            <RequiredLabel icon={<MdFastfood />} text="Restaurant ID" />
            <input
              type="text"
              name="restroId"
              required
              value={formData.restroId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
              placeholder="Enter restaurant ID"
            />
          </div>

          {/* Name Input - Updated with required indicator */}
          <div className="relative">
            <RequiredLabel icon={<FaPizzaSlice />} text="Dish Name" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
              placeholder="Enter dish name"
            />
          </div>

          {/* Description Input - Updated with required indicator */}
          <div>
            <RequiredLabel icon={<MdDescription />} text="Description" />
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
              placeholder="Enter dish description"
              rows="3"
            />
          </div>

          {/* Details Input - No required indicator */}
          <div>
            <label className="text-gray-700 font-medium mb-2 block flex items-center">
              <BiDetail className="mr-2" /> Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
              placeholder="Enter additional details (optional)"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Price Input - Updated with required indicator */}
            <div>
              <RequiredLabel icon={<FaRupeeSign />} text="Price" />
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
                placeholder="Enter price"
              />
            </div>

            {/* Category Input - Updated with required indicator */}
            <div>
              <RequiredLabel icon={<MdCategory />} text="Category" />
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Available Quantity - Updated with required indicator */}
            <div>
              <RequiredLabel text="Available Quantity" />
              <input
                type="number"
                name="availableQuantity"
                required
                value={formData.availableQuantity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>

            {/* Discount - No required indicator */}
            <div>
              <label className="text-gray-700 font-medium mb-2 block flex items-center">
                <FaStar className="mr-2" /> Discount %
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
                placeholder="Enter discount (optional)"
              />
            </div>
          </div>

          {/* Image URL - No required indicator */}
          <div>
            <label className="text-gray-700 font-medium mb-2 block flex items-center">
              <FaImage className="mr-2" /> Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f3d56] focus:border-transparent"
              placeholder="Enter image URL (optional)"
            />
          </div>

          {/* Is Veg Checkbox - Updated with required indicator */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVeg"
              checked={formData.isVeg}
              onChange={handleChange}
              className="w-4 h-4 text-[#3f3d56] border-gray-300 rounded focus:ring-[#3f3d56]"
            />
            <label className="flex items-center text-gray-700 font-medium">
              <FaLeaf className="mr-2 text-green-500" /> Vegetarian
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>

          {/* Optional fields note */}
          <div className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#3f3d56] text-white py-3 px-6 rounded-lg hover:bg-[#2d2b3f] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <MdFastfood className="text-xl" />
            <span>{id ? 'Update Dish' : 'Add Dish'}</span>
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddFoodForm;