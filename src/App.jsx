import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom'; // Import routing components
import AppRoutes from './AppRoutes'; // Import the new component

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes /> {/* Use AppRoutes which contains routing and LowerMenu logic */}
      </Router>
    </QueryClientProvider>
  );
}

export default App;
