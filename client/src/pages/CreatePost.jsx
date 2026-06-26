import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Technology', 'Travel', 'Food', 'Health', 'Business', 'Other'];

export default function CreatePost() {
  const [form, setForm] = useState({
    title: '', content: '', category: 'Technology', coverImage: ''
  });
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <div className="create-container">
      <h1>Create New Post</h1>
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
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
}

