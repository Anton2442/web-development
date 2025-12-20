import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TasksList.css';

const API_URL = 'http://localhost:3001';

export default function TasksList({ user, token, onLogout }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(() => {
      checkReminders();
    }, 60000); // Проверка каждую минуту
    return () => clearInterval(interval);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tasks/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data);
      checkReminders(data);
    } catch (err) {
      console.error('Ошибка загрузки задач:', err);
      if (err.response?.status === 401) {
        onLogout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const checkReminders = (tasksList = tasks) => {
    const now = new Date();
    const upcoming = tasksList.filter((task) => {
      if (!task.reminder_date) return false;
      const reminder = new Date(task.reminder_date);
      const diff = reminder - now;
      return diff > 0 && diff <= 3600000; // В течение часа
    });
    setNotifications(upcoming);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить задачу?')) return;

    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      alert('Ошибка удаления задачи');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Мои задачи</h1>
        <div>
          <button className="btn-primary" onClick={() => navigate('/tasks/new')}>
            + Новая задача
          </button>
          <button className="btn-secondary" onClick={onLogout}>
            Выход
          </button>
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="notifications">
          <h3>Напоминания:</h3>
          {notifications.map((task) => (
            <div key={task.id} className="notification">
              {task.description} - {formatDate(task.reminder_date)}
            </div>
          ))}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>У вас пока нет задач</p>
          <button className="btn-primary" onClick={() => navigate('/tasks/new')}>
            Создать первую задачу
          </button>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              {task.image_url && (
                <img
                  src={`${API_URL}${task.image_url}`}
                  alt="Task"
                  className="task-image"
                />
              )}
              <div className="task-content">
                <p className="task-description">{task.description}</p>
                {task.reminder_date && (
                  <p className="task-reminder">
                    Напоминание: {formatDate(task.reminder_date)}
                  </p>
                )}
                <div className="task-actions">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/tasks/${task.id}/edit`)}
                  >
                    Редактировать
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(task.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

