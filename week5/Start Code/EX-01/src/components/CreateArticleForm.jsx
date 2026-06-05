import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/articles';

export default function CreateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = {
      title: form.title,
      content: form.content,
      journalistId: Number(form.journalistId),
      categoryId: Number(form.categoryId),
    };

    try {
      await axios.post(API_URL, article);
      navigate('/');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>View Articles</Link>
        <Link to="/add">Add Article</Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <h3>Add New Article</h3>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
        <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
        <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}