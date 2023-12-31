import {Navigate} from 'react-router-dom';
import React from 'react';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace/>
)}

export default ProtectedRouteElement; 