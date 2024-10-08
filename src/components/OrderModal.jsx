import { useState } from 'react';
import PropTypes from 'prop-types';

const OrderModal = ({ isOpen, onClose, onConfirm, coinData }) => {
  const [selectedTime, setSelectedTime] = useState(1);
  const [investmentAmount, setInvestmentAmount] = useState(100);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({
      time: selectedTime,
      amount: investmentAmount,
      coin: coinData.symbol,
      direction: coinData.direction,
      price: coinData.current_price
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Confirmation</h2>
          <button onClick={onClose} className="text-gray-500">&times;</button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Expiration time</h3>
          <div className="flex space-x-2">
            {[1, 2, 3].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`flex-1 py-2 px-4 rounded ${
                  selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {time} minute
                <br />
                Profit {time * 15}%
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Investment Amount</h3>
          <div className="flex space-x-2">
            {[100, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => setInvestmentAmount(amount)}
                className={`flex-1 py-2 px-4 rounded ${
                  investmentAmount === amount ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {amount}
              </button>
            ))}
            <button className="flex-1 py-2 px-4 rounded bg-gray-200">Other</button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between">
            <span>Balance:</span>
            <span>$ 0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee:</span>
            <span>0%</span>
          </div>
        </div>

        <div className="mb-4">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Name</td>
                <td>Direction</td>
                <td>Present Price</td>
                <td>Amount</td>
              </tr>
              <tr>
                <td>{coinData.symbol}/USDT</td>
                <td>{coinData.direction}</td>
                <td>{coinData.current_price}</td>
                <td>{investmentAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};

OrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  coinData: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    current_price: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderModal;