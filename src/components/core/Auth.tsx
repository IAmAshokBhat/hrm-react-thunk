import { Navigate, useLocation } from 'react-router-dom';
import { isValidToken } from '../../utils';

// @ts-ignore
export const Auth = ({ children }) => {
  const location = useLocation();

  return isValidToken() ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
};
