import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/tasks" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            token ? (
              <Navigate to="/tasks" replace />
            ) : (
              <RegisterPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            token && user ? (
              <TasksList user={user} token={token} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/tasks/new"
          element={
            token && user ? (
              <TaskForm user={user} token={token} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            token && user ? (
              <TaskForm user={user} token={token} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to={token ? '/tasks' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
