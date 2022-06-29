import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MyHistory from './pages/MyHistory';
import Login from './pages/Login';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/meu-historico" element={<MyHistory />} />
    </Routes>
  );
};

export default Router;
