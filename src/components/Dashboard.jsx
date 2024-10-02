import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import PropTypes from 'prop-types'; 
import { FaWallet, FaDownload, FaExchangeAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { BsChatDots, BsGear } from 'react-icons/bs';

const fetchCoinData = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 3,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoins = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCoinData();
        setCoins(data);
      } catch (err) {
        console.log("err", err);
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    getCoins();

    // Optionally, you can set up refetching at intervals:
    const interval = setInterval(getCoins, 86400000); // Refetch every 30 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <div className="flex space-x-2">
          <BsChatDots className="text-gray-600 text-xl" />
          <Link to={`/logout`}>
            <BsGear className="text-gray-600 text-xl" />
          </Link>
        
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow p-6 mb-4 text-white">
        <h2 className="text-lg font-semibold mb-2">Block Production</h2>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">1234 5678 9012</span>
          <IoIosArrowDown className="text-2xl" />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <button className="flex flex-col items-center bg-white rounded-lg p-2 flex-1 mr-2">
          <FaWallet className="text-blue-500 text-xl mb-1" />
          <span className="text-xs">Recharge</span>
        </button>
        <button className="flex flex-col items-center bg-white rounded-lg p-2 flex-1 mr-2">
          <FaExchangeAlt className="text-green-500 text-xl mb-1" />
          <span className="text-xs">Withdrawal</span>
        </button>
        <button className="flex flex-col items-center bg-white rounded-lg p-2 flex-1">
          <FaDownload className="text-purple-500 text-xl mb-1" />
          <span className="text-xs">Download</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Coin 24Hr</h3>
          <span className="text-blue-500 text-sm">See more</span>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          coins.map((coin) => (
            <CoinItem
              key={coin.id}
              symbol={coin.symbol}
              name={`${coin.symbol.toUpperCase()}/USDT`}
              value={coin.current_price.toFixed(4)}
              change={coin.price_change_percentage_24h.toFixed(2)}
              image={coin.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

const CoinItem = ({ symbol, name, value, change, image }) => {
  const isNegative = parseFloat(change) < 0;

  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center">
        <img 
          src={image} 
          alt={symbol}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{name}</span>
      </div>
      <div className="text-right">
        <div className="font-semibold">{value}</div>
        <div className={isNegative ? 'text-red-500' : 'text-green-500'}>
          {isNegative ? '' : '+'}
          {change}%
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
CoinItem.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired, // Add image prop validation
};

export default Dashboard;
