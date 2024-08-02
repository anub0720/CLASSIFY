// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/index';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { userLoggedIn } = useAuth();

  return userLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired, // Updated to elementType
};

export default ProtectedRoute;
