import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/articles';

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

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
      await axios.put(`${API_URL}/${id}`, article);
      navigate('/');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>

      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />

      <button type="submit">Update</button>
    </form>
  );
}
