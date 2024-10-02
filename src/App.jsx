import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import Dashboard from './components/Dashboard';
import CoinList from './components/CoinList';
import UserProfile from "./components/UserProfile";
import LowerMenu from './components/LowerMenu';
import Market from "./components/Market";
import TradeScreen from './components/TradeScreen';
import TradeHistoryScreen from "./components/History";
import Logout from "./components/Logout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100 pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Home route */}
            <Route path="/coins" element={<CoinList />} /> {/* CoinList route */}
            <Route path="/history" element={<TradeHistoryScreen />} />
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/trade/:coinId" element={<TradeScreen />} />

          </Routes>
          <LowerMenu />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
