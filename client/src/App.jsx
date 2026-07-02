import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Markets from "./pages/Markets";
import Prices from "./pages/Prices";
import ComparePrices from "./pages/ComparePrices";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* Public Routes */}

        <Route index element={<Home />} />

        <Route
          path="login"
          element={<Login />}
        />

        <Route
          path="register"
          element={<Register />}
        />

        <Route
          path="forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="reset-password"
          element={<ResetPassword />}
        />

        {/* Protected Routes */}

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* NEW PRODUCT DETAILS PAGE */}

        <Route
          path="product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="markets"
          element={
            <ProtectedRoute>
              <Markets />
            </ProtectedRoute>
          }
        />

        <Route
          path="prices"
          element={
            <ProtectedRoute>
              <Prices />
            </ProtectedRoute>
          }
        />

        <Route
          path="compare-prices"
          element={
            <ProtectedRoute>
              <ComparePrices />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>
    </Routes>
  );
}

export default App;