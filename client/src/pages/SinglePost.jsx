import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const API = 'http://localhost:5000/api';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/posts/${id}`)
      .then(res => { setPost(res.data); setLoading(false); })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load post');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`${API}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete post');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="error-msg">{error}</p>;
  if (!post) return null;

  const isOwner = user && post.author && user.id === post.author._id;

  return (
    <div className="single-post-container">
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="single-post-cover" />
      )}
      <span className="post-category">{post.category}</span>
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>By {post.author?.username}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post.views} views</span>
      </div>
      <div className="single-post-content">
        {post.content}
      </div>

      {isOwner && (
        <div className="post-owner-actions">
          <Link to={`/edit/${post._id}`} className="edit-btn">Edit</Link>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
}
