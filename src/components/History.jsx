import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaExchangeAlt } from 'react-icons/fa';
import { BsChatDots, BsGear } from 'react-icons/bs';
import PropTypes from 'prop-types';

// Dummy data for trade history
const tradeHistory = [
  { id: 1, type: 'deposit', amount: 1000, currency: 'USDT', date: '2023-10-01', status: 'completed' },
  { id: 2, type: 'trade', amount: 250, currency: 'BTC', profit: 50, date: '2023-10-02', status: 'completed' },
  { id: 3, type: 'withdrawal', amount: 500, currency: 'USDT', date: '2023-10-03', status: 'pending' },
  { id: 4, type: 'trade', amount: 100, currency: 'ETH', profit: -20, date: '2023-10-04', status: 'completed' },
  { id: 5, type: 'deposit', amount: 2000, currency: 'USDT', date: '2023-10-05', status: 'completed' },
];

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
        {trade.type === 'trade' ? (
          <>
            {trade.amount} {trade.currency}
            <span className={trade.profit >= 0 ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}>
              {trade.profit >= 0 ? '+' : '-'}${Math.abs(trade.profit)}
            </span>
          </>
        ) : (
          <>
            {trade.amount} {trade.currency}
          </>
        )}
      </div>
      <div className="text-sm text-gray-500">{new Date(trade.date).toLocaleDateString()}</div>
    </div>
  );
};

const TradeHistoryScreen = () => {
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
        {tradeHistory.map((trade) => (
          <TradeHistoryCard key={trade.id} trade={trade} />
        ))}
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
      profit: PropTypes.number, // Not required since it's only present for 'trade' types
      date: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['completed', 'pending']).isRequired,
    }).isRequired,
  };
  

export default TradeHistoryScreen;
