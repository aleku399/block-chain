import { useState } from 'react';
import PropTypes from 'prop-types';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import Loader from "./Loader";
import axiosInstance from "../api";

const OrderModal = ({ isOpen, onClose, onConfirm, coinData, earnings }) => {
  const [selectedTime, setSelectedTime] = useState(1);
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [isOther, setIsOther] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!isOpen) return null;

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setInvestmentAmount(Number(e.target.value));
  };

  const finalAmount = isOther && customAmount ? Number(customAmount) : investmentAmount;

  // Flutterwave payment configuration
  const config = {
    public_key: "FLWPUBK_TEST-b95582bdc8e57be18e128ef3fadd6448-X",
    tx_ref: Date.now().toString(),
    amount: finalAmount,
    currency: user.country === 'Uganda' ? 'UGX' : 'USD',
    payment_options: 'card, mobilemoneyuganda', // Visa and mobile money
    customer: {
      email: "aleku399@gmail.com",
      phonenumber: user.phoneNumber,
      name: user.fullName,
    },
    customizations: {
      title: "Order Payment",
      description: `Payment for ${coinData.symbol} trade`,
      logo: "/vite.svg",
    },
  };

  // Callback after successful payment
  const handleFlutterwaveSuccess = async (response) => {
    if (response.status === 'successful') {
      try {
        await axiosInstance.post('/histories', {
          data: {
            type: 'trade',
            amount: finalAmount,
            coin: coinData.symbol,
            direction: coinData.direction,
            price: coinData.current_price,
            client: user.id, 
            date: new Date(),
          }
        });
        console.log('Trade history recorded:', response);
        onConfirm(response);
      } catch (error) {
        console.error('Error saving trade history:', error);
      } finally {
        setIsLoading(false);
        onClose();
      }
    }
    closePaymentModal(); // close modal programmatically
  };

  // Handle error if payment fails
  const handleFlutterwaveClose = () => {
    console.log('Payment modal closed');
    setIsLoading(false);
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
                onClick={() => {
                  setInvestmentAmount(amount);
                  setIsOther(false);
                }}
                className={`flex-1 py-2 px-4 rounded ${
                  investmentAmount === amount && !isOther ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {amount}
              </button>
            ))}
            <button
              className={`flex-1 py-2 px-4 rounded ${isOther ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setIsOther(true)}
            >
              Other
            </button>
          </div>

          {isOther && (
            <div className="mt-2">
              <input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmount}
                className="w-full py-2 px-4 border rounded"
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between">
            <span>Balance:</span>
            <span>$ {earnings?.totalIncome}</span>
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

        <FlutterWaveButton
          {...config}
          className="w-full bg-blue-500 text-white py-2 rounded"
          text={isLoading ? <Loader /> : "Confirm Order"}
          callback={handleFlutterwaveSuccess}
          onClose={handleFlutterwaveClose}
        />
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
  earnings: PropTypes.any,
};

export default OrderModal;
