import './App.css';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostsPage from './components/PostsPage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [posts, setPosts] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
    });
    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return instance;
  }, [token]);

  useEffect(() => {
    if (token) {
      setPage('posts');
      fetchPosts();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
    } catch (err) {
      console.error('Не удалось загрузить посты', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoadingAuth(true);
    try {
      const { data } = await api.post('/login', { email, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setPage('posts');
      await fetchPosts();
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleRegister = async ({ email, firstName, lastName, password }) => {
    setLoadingAuth(true);
    try {
      await api.post('/register', {
        email,
        firstName,
        lastName,
        password,
      });
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setPage('login');
    setPosts([]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">CALIFORNIA</div>
        <div>
          {token ? (
            <button className="header-button" onClick={handleLogout}>
              Выход
            </button>
          ) : (
            <button
              className="header-button"
              onClick={() => setPage(page === 'login' ? 'register' : 'login')}
            >
              {page === 'login' ? 'Регистрация' : 'Войти'}
            </button>
          )}
        </div>
      </header>

      <div className="content">
        {page === 'login' && (
          <LoginPage
            onLogin={handleLogin}
            switchToRegister={() => setPage('register')}
            loading={loadingAuth}
          />
        )}

        {page === 'register' && (
          <RegisterPage
            onRegister={handleRegister}
            switchToLogin={() => setPage('login')}
            loading={loadingAuth}
          />
        )}

        {page === 'posts' &&
          (loadingPosts ? <p>Загружаем посты...</p> : <PostsPage posts={posts} />)}
      </div>
    </div>
  );
}

export default App;
