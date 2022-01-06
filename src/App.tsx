import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Layout from '@/layout';
import PrivateRoute from '@/routes/private_route';
import PublicRoute from '@/routes/public_route';
import Login from '@/views/Login';
import Main from '@/views/Main';
import Math from '@/views/Math';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/main" element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="math"
          element={
            <PrivateRoute>
              <Math />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
