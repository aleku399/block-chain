import { useNavigate } from 'react-router-dom';
import { BsChatDots, BsGear, BsPerson, BsChevronRight } from 'react-icons/bs';

const Logout 
= () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const username = user ? user.username : "Guest";

  const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    navigate("/login");
  }

  
  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex space-x-2">
          <BsChatDots className="text-gray-600 text-xl" />
          <BsGear className="text-gray-600 text-xl" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Account Picture</span>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <BsPerson className="text-white text-2xl" />
          </div>
        </div>

        <div className="border-b pb-2">
          <span className="text-gray-600">Username</span>
          <p className="text-black">{username}</p>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <span className="text-gray-600">System Language</span>
            <p className="text-black">English</p>
          </div>
          <BsChevronRight className="text-gray-400" />
        </div>

        <button onClick={logout} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg mt-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
