import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../api'; 

const ProtectedRoute = ({ children }) => {
    const auth = isAuthenticated();
    console.log("Is user authenticated?", auth); // Add this log to check if the user is authenticated.
    
    return auth ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default ProtectedRoute;
