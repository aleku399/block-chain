import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';
import { BsChatDots, BsGear } from 'react-icons/bs';
import PropTypes from 'prop-types';

import axiosInstance from "../api";

const TradeHistoryCard = ({ trade }) => {
  const getIcon = () => {
    switch (trade.type) {
      case 'deposit':
        return <FaArrowDown className="text-green-500" />;
      case 'withdrawal':
        return <FaArrowUp className="text-red-500" />;
      case 'trade':
        return <FaExchangeAlt className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    return trade.status === 'completed' ? 'text-green-500' : 'text-yellow-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {getIcon()}
          <span className="ml-2 font-semibold capitalize">{trade.type}</span>
        </div>
        <span className={`font-semibold ${getStatusColor()}`}>{trade.status}</span>
      </div>
      <div className="text-lg font-bold">
        {trade.amount} {trade.currency}
        {trade.type === 'trade' && trade.profit !== undefined && (
          <span className={trade.profit >= 0 ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}>
            {trade.profit >= 0 ? '+' : '-'}${Math.abs(trade.profit)}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-500">{new Date(trade.date).toLocaleDateString()}</div>
    </div>
  );
};

const TradeHistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosInstance.get(`/histories?filters[client][username][$eq]=${user.username}`);
        setHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchHistory();
  }, [user.username]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Trade History</h1>
        <div className="flex space-x-2">
          <BsChatDots className="text-gray-600 text-xl" />
          <Link to={`/logout`}>
            <BsGear className="text-gray-600 text-xl" />
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        {history.length > 0 ? (
          history.map((item) => (
            <TradeHistoryCard
              key={item.id}
              trade={{
                id: item.id,
                type: item.type || 'trade', // Default to 'trade' if type is missing
                amount: item.amount,
                currency: item.coin,
                date: item.date,
                status: item.type === 'withdrawal' ? 'pending' : 'completed', // Set 'pending' for withdrawals
                profit: item.type === 'trade' ? item.profit : undefined,
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No Transactions Yet Made</p>
        )}
      </div>
    </div>
  );
};

TradeHistoryCard.propTypes = {
  trade: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['deposit', 'withdrawal', 'trade']).isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    profit: PropTypes.number,
    date: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['completed', 'pending']).isRequired,
  }).isRequired,
};

export default TradeHistoryScreen;
