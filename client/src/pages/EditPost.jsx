import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const CATEGORIES = ['Technology', 'Travel', 'Food', 'Health', 'Business', 'Other'];
const API = 'http://localhost:5000/api';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/posts/${id}`)
      .then(res => {
        setForm({
          title: res.data.title,
          content: res.data.content,
          category: res.data.category,
          coverImage: res.data.coverImage || ''
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load post');
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${API}/posts/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="error-msg">{error}</p>;
  if (!form) return null;

  return (
    <div className="create-container">
      <h1>Edit Post</h1>
      {error && <p className="error-msg">{error}</p>}
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Post Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
        </select>
        <input
          name="coverImage"
          placeholder="Cover Image URL (optional)"
          value={form.coverImage}
          onChange={handleChange}
        />
        <textarea
          name="content"
          rows="15"
          placeholder="Write your post here..."
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}


