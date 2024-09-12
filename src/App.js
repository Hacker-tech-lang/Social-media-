import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch posts when component loads
    axios.get('/api/posts').then(response => setPosts(response.data));
  }, []);

  const handlePostSubmit = async () => {
    const response = await axios.post('/api/posts', { content: newPost });
    setPosts([...posts, response.data]);
    setNewPost('');
  };

  return (
    <div>
      <h1>Social Media App</h1>
      <input 
        type="text" 
        value={newPost} 
        onChange={(e) => setNewPost(e.target.value)} 
        placeholder="Write a post..." 
      />
      <button onClick={handlePostSubmit}>Post</button>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
