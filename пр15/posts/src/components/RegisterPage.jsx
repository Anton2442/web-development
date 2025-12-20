import { useState } from 'react';

export default function RegisterPage({ onRegister, switchToLogin, loading }) {
  const [form, setForm] = useState({
    email: '',
    emailRepeat: '',
    firstName: '',
    lastName: '',
    password: '',
    agree: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.email !== form.emailRepeat) {
      setError('Почты не совпадают');
      return;
    }
    if (!form.agree) {
      setError('Необходимо согласие на обработку данных');
      return;
    }

    try {
      await onRegister(form);
      setSuccess('Регистрация успешна, теперь войдите');
      setForm({
        email: '',
        emailRepeat: '',
        firstName: '',
        lastName: '',
        password: '',
        agree: false,
      });
    } catch (err) {
      const apiError =
        err?.response?.data?.error ||
        err?.response?.data?.errors?.[0]?.msg ||
        'Не удалось зарегистрироваться';
      setError(apiError);
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">Регистрация</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Почта</label>
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
          <label className="form-label">Повторите почту</label>
          <input
            type="email"
            className="form-input"
            placeholder="oooo@gmail.com"
            required
            value={form.emailRepeat}
            onChange={(e) => setForm({ ...form, emailRepeat: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Имя</label>
          <input
            type="text"
            className="form-input"
            placeholder="Вася"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Фамилия</label>
          <input
            type="text"
            className="form-input"
            placeholder="Петров"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="agreeCheckbox"
            checked={form.agree}
            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
          />
          <label htmlFor="agreeCheckbox">
            Вы согласны с политикой обработки персональных данных
          </label>
        </div>

        {error && <div className="error-text">{error}</div>}
        {success && <div className="success-text">{success}</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
        </button>

        <div className="auth-link">
          Уже есть аккаунт? <a onClick={switchToLogin}>Войти</a>
        </div>
      </form>
    </div>
  );
}

