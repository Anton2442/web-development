import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './TaskForm.css';

const API_URL = 'http://localhost:3001';

export default function TaskForm({ user, token }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({
    description: '',
    reminder_date: '',
    image: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        description: data.description,
        reminder_date: data.reminder_date ? data.reminder_date.slice(0, 16) : '',
      });
      if (data.image_url) {
        setPreview(`${API_URL}${data.image_url}`);
      }
    } catch (err) {
      setError('Ошибка загрузки задачи');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('description', form.description);
      if (form.reminder_date) {
        formData.append('reminder_date', new Date(form.reminder_date).toISOString());
      }
      if (form.image) {
        formData.append('image', form.image);
      }

      if (isEdit) {
        await axios.put(`${API_URL}/api/tasks/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${API_URL}/api/tasks/user/${user.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка сохранения задачи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form-card">
        <h1>{isEdit ? 'Редактировать задачу' : 'Новая задача'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Описание задачи</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows="5"
              placeholder="Введите описание задачи..."
            />
          </div>

          <div className="form-group">
            <label>Напоминание (необязательно)</label>
            <input
              type="datetime-local"
              value={form.reminder_date}
              onChange={(e) => setForm({ ...form, reminder_date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Изображение (необязательно)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/tasks')}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

