import  { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { BsChatDots, BsGear } from 'react-icons/bs';

import OrderModal from './OrderModal'; 
import { fetchUserEarnings } from "../api";

const fetchCoinDetails = async (coinId) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  return response.data;
};

const fetchCoinMarketData = async (coinId) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: '1',
    },
  });
  return response.data;
};

const TradeScreen = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [earnings, setEarnings] = useState(null);

  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));

  const fetchEarnings = async () => {
    try {
      const response = await fetchUserEarnings(user.username)
      setEarnings(response.data[0]); 
    } catch (error) {
      console.error('Error fetching earnings:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEarnings();
    }
  }, []);


  useEffect(() => {
    const getCoinDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchCoinDetails(coinId);
        const market = await fetchCoinMarketData(coinId);
        setCoinData(details);
        setMarketData(market);
      } catch (err) {
        console.error('Error fetching coin data:', err);
        setError('Error fetching coin data');
      } finally {
        setLoading(false);
      }
    };
    getCoinDetails();
  }, [coinId]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!marketData || !marketData.prices) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: No chart data available</div>;
  }

  const chartData = marketData.prices.map(price => ({
    time: new Date(price[0]).toLocaleTimeString(),
    price: price[1],
  }));

  const handleOrderConfirm = (orderDetails) => {
    console.log('Order confirmed:', orderDetails);
    // Here you would typically send the order to your backend
    // For now, we'll just redirect to the home page
    navigate('/');
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{coinData.name}</h1>
        <div className="flex space-x-2">
          <BsChatDots className="text-gray-600 text-xl" />
          <Link to={`/logout`}>
            <BsGear className="text-gray-600 text-xl" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{coinData.name}/USDT</h1>
          <div className="text-sm text-gray-500">Time-sharing 1min 15min 30min 1hour</div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis domain={['dataMin', 'dataMax']} />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6 p-4">
        <h2 className="text-xl font-semibold mb-4">Key Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Market Cap:</strong> ${coinData.market_data.market_cap.usd.toLocaleString()}</div>
          <div><strong>24h Volume:</strong> ${coinData.market_data.total_volume.usd.toLocaleString()}</div>
          <div><strong>All Time High:</strong> ${coinData.market_data.ath.usd.toLocaleString()}</div>
          <div><strong>Circulating Supply:</strong> {coinData.market_data.circulating_supply.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <button 
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <FaArrowDown className="mr-2" />
          Buy Fall
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center">
          <FaArrowUp className="mr-2" />
          Buy Up
        </button>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleOrderConfirm}
        coinData={coinData}
        earnings={earnings}
      />
    </div>
  );
};

export default TradeScreen;
