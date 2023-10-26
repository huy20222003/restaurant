import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
//context
import { useAuth } from '../hooks/context';
import PropTypes from 'prop-types';
//---------------------------------------

const PrivateRouter = ({ element, redirectTo }) => {
  const {
    authState: { isAuthenticated },
    loadUser,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await loadUser();
      setIsLoading(false);
    };

    fetchData();
  }, [loadUser]);

  if (isLoading) {
    return;
  }

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to={redirectTo} replace />;
  }
};

PrivateRouter.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRouter;
