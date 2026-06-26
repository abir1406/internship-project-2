import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

const API = 'http://localhost:5000/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/posts`)
      .then(res => { setPosts(res.data); setLoading(false); })
      .catch(err => { setError('Failed to load posts'); setLoading(false); });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="home-container">
      <h1>Latest <span className="highlight">Blog Posts</span></h1>
      <div className="posts-grid">
        {posts.length === 0
          ? <p>No posts yet. Be the first to write one!</p>
          : posts.map(post => <PostCard key={post._id} post={post} />)
        }
      </div>
    </div>
  );
}

