import React, { useEffect, useState } from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    showLoader();
    const timeoutId = setTimeout(() => {
      hideLoader();
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]); // Trigger useEffect when the pathname changes

  return (
    <div>
    {loading && (
      <div id="global-loader">
        <div className="whirly-loader"></div>
      </div>
    )}
      <Routes>
        <Route path="/"/>
      </Routes>
  </div>
  );
};

export default Loader;
