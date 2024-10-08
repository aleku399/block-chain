import { Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Dashboard from './components/Dashboard';
import CoinList from './components/CoinList';
import UserProfile from "./components/UserProfile";
import Market from "./components/Market";
import TradeScreen from './components/TradeScreen';
import TradeHistoryScreen from "./components/History";
import Logout from "./components/Logout";
import Login from "./components/Login";
import Register from "./components/Register";
import LowerMenu from './components/LowerMenu';

import { isAuthenticated } from './api'; 

const AppRoutes = () => {
  const location = useLocation(); // Get the current location

  // Check if the current path is /login or /register
  const hideLowerMenu = location.pathname === '/login' || location.pathname === '/register';

  console.log(" hideLowerMenu", hideLowerMenu);

  const auth = isAuthenticated();
  console.log("Is user authenticated?", auth); // Debugging output

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/coins" element={<CoinList />} />
            <Route path="/history" element={<TradeHistoryScreen />} />
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/trade/:coinId" element={<TradeScreen />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect to login if a user tries to access a protected route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>

      {/* Conditionally render LowerMenu for all routes except login and register */}
      {!hideLowerMenu && <LowerMenu />}
    </div>
  );
};

export default AppRoutes;
