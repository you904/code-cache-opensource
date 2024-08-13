// PrivateRoute.js

import React from 'react';
import { Route,Link} from 'react-router-dom';
import { auth } from '../config/firebaseConfig';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const currentUser = auth.currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Link to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
