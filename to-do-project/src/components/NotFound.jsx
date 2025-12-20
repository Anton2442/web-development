import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Страница не найдена</p>
        <Link to="/tasks" className="btn-primary">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

