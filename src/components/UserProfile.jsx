import PropTypes from 'prop-types'; // Import PropTypes
import { FaWallet, FaArrowUp, FaArrowDown, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { BsChatDots, BsGear } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Guest";

  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    navigate("/login");
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Equity</h1>
        <div className="flex space-x-2">
          <BsChatDots className="text-gray-600 text-xl" />
          <Link to={`/logout`}>
            <BsGear className="text-gray-600 text-xl" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-4xl text-gray-600" />
            <div>
              <h2 className="text-xl font-semibold">{username}</h2>
              <p className="text-sm text-gray-500">
                Reputation Score: <strong>100</strong> <span className="text-green-500">Unbound</span>
              </p>
            </div>
          </div>
          <div>
            <button onClick={logout} className="flex items-center space-x-1 text-red-500">
              <FaSignOutAlt className="text-2xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow p-6 text-white mb-6">
        <h3 className="text-lg font-semibold mb-2">My Wallet</h3>
        <div className="text-4xl font-bold mb-4">$4821000.00</div>
        <div className="flex justify-around">
          <button className="flex flex-col items-center">
            <FaWallet className="text-white text-2xl mb-1" />
            <span className="text-xs">Recharge</span>
          </button>
          <button className="flex flex-col items-center">
            <FaArrowUp className="text-white text-2xl mb-1" />
            <span className="text-xs">Withdrawal</span>
          </button>
          <button className="flex flex-col items-center">
            <FaArrowDown className="text-white text-2xl mb-1" />
            <span className="text-xs">Market</span>
          </button>
        </div>
      </div>

      {/* Earnings Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="font-semibold mb-4">Earnings Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <EarningsCard label="Today's Earnings" amount="0" />
          <EarningsCard label="Weekly Earnings" amount="1986000.00" />
          <EarningsCard label="Monthly Earnings" amount="1986000.00" />
          <EarningsCard label="Total Income" amount="1986000.00" />
          <EarningsCard label="Last Month's Earnings" amount="0" />
          <EarningsCard label="Withdrawn" amount="0" />
        </div>
      </div>
    </div>
  );
};

// EarningsCard Component
const EarningsCard = ({ label, amount }) => {
  return (
    <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
      <span>{label}</span>
      <span className="font-semibold">{amount}</span>
    </div>
  );
};

// Adding PropTypes validation for EarningsCard props
EarningsCard.propTypes = {
  label: PropTypes.string.isRequired, // Validating that label is a string and is required
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Validating that amount can be a string or a number and is required
};

export default UserProfile;
