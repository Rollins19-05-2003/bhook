import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import AddFoodForm from "./components/AddFood";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
   
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        {children}
      </>
    );
  };

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            } />
            <Route path="/signup" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
            } />
            
            {/* Home route */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
            } />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-food"
              element={
                <ProtectedRoute>
                  <AddFoodForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-food/:id"
              element={
                <ProtectedRoute>
                  <AddFoodForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
