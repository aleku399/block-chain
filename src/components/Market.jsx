import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BsChatDots, BsGear } from 'react-icons/bs';

const fetchCoinData = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};

const MarketScreen = () => {
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
        console.error("Error fetching data:", err);
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    getCoins();
    const refreshInterval = setInterval(getCoins, 86400000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Market</h1>
        <div className="flex space-x-2">
          <BsChatDots className="text-gray-600 text-xl" />
          <Link to={`/logout`}>
            <BsGear className="text-gray-600 text-xl" />
          </Link>
          
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          coins.map((coin) => (
            <Link key={coin.id} to={`/trade/${coin.id}`}>
              <CoinItem
                symbol={coin.symbol}
                name={`${coin.symbol.toUpperCase()}/USDT`}
                value={coin.current_price.toFixed(4)}
                change={coin.price_change_percentage_24h.toFixed(2)}
                image={coin.image}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

const CoinItem = ({ symbol, name, value, change, image }) => {
  const isNegative = parseFloat(change) < 0;

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center">
        <img src={image} alt={symbol} className="w-10 h-10 rounded-full mr-4" />
        <div className="text-lg font-medium">{name}</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-gray-800">${value}</div>
        <div className={isNegative ? 'text-red-500' : 'text-green-500'}>
          {isNegative ? '' : '+'}
          {change}%
        </div>
      </div>
    </div>
  );
};

CoinItem.propTypes = {
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    change: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, // Add image prop validation
  };

export default MarketScreen;
