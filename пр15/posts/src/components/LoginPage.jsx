import { useState } from 'react';

export default function LoginPage({ onLogin, switchToRegister, loading }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin(form);
    } catch (err) {
      setError(err?.response?.data?.error || 'Не удалось войти');
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">Авторизация</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Логин</label>
          <input
            type="email"
            className="form-input"
            placeholder="oooo@gmail.com"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••••••••"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Входим...' : 'Войти'}
        </button>

        <div className="auth-link">
          Нет аккаунта? <a onClick={switchToRegister}>Зарегистрируйтесь</a>
        </div>
      </form>
    </div>
  );
}

