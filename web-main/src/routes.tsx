import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MyHistory from './pages/MyHistory';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meu-historico" element={<MyHistory />} />
    </Routes>
  );
};

export default Router;
