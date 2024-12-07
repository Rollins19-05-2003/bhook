import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const FoodCard = ({ food, isAdmin, setFoodItems }) => {
  const navigate = useNavigate();
  const { name, price, description, availableQuantity, image, isVeg } = food;
  
  const handleEdit = (id) => {
    navigate(`/edit-food/${id}`);
    console.log("edit food item", id);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/v1/food/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      toast.success("Food item deleted successfully!");
      setTimeout(() => {
        setFoodItems(prevFoodItems => prevFoodItems.filter(item => item._id !== id));
      }, 1000);
    } else {
      toast.error("Failed to delete food item");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image || "default_food_image.jpg"}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>

          {availableQuantity <= 5 && (
            <span className="bg-black text-white text-xs px-2 py-1 rounded">
              {availableQuantity} left
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <span className={`${isVeg ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded`}>
            {isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">Rs {price}</span>

          {isAdmin ? (
            <div className="space-x-2">
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => handleEdit(food._id)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline text-sm"
                onClick={() => handleDelete(food._id)}
              >
                Delete
              </button>
            </div>
          ) : (
            <button className="bg-[#3f3d56] text-white px-4 py-2 rounded hover:bg-[#2d2b3f] transition-colors text-sm">
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FoodCard;
