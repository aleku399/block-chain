import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaHome, FaHistory, FaChartBar, FaUser } from 'react-icons/fa';

const LowerMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around py-2">
        <Link to="/" className="flex flex-col items-center"> {/* Link to Dashboard */}
          <FaHome className="text-xl mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center"> {/* Placeholder for Trade History */}
          <FaHistory className="text-xl mb-1" />
          <span className="text-xs">Trade History</span>
        </Link>
        <Link to="/market" className="flex flex-col items-center"> {/* Placeholder for Market */}
          <FaChartBar className="text-xl mb-1" />
          <span className="text-xs">Market</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center"> {/* Placeholder for Profile */}
          <FaUser className="text-xl mb-1" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default LowerMenu;
