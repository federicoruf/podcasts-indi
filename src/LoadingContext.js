import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const switchLoading = (value) => {
    setLoading(value);
  };

  return (
    <LoadingContext.Provider value={{ loading, switchLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node,
};
