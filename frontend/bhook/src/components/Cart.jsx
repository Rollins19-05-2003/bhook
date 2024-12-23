import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../utils/cartSlice';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (item) => {
    console.log(item)
    dispatch(removeItem(item));
    toast.success(`${item.name} removed from cart!`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared!");
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    const orderData = {
      amount: totalPrice * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt#1", // Optional
      payment_capture: 1, // Auto capture
    };

    // Make a request to your backend to create an order
    const response = await fetch('/api/orderRoutes/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();

    if (!order || !order.id) {
      toast.error("Failed to create order. Please try again.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        // Handle successful payment here
        toast.success("Payment successful!");
        // Optionally, you can clear the cart or redirect the user
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                  <img src={item.image || "default_food_image.jpg"} alt={item.name} className="w-full h-48 object-cover rounded" />
                  <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                  <p className="text-gray-600">₹ {item.price}</p>
                  <button
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </button>
                  
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-lg font-semibold">Total Price: ₹ {totalPrice}</p>
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition-colors mt-4"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors mt-4"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;