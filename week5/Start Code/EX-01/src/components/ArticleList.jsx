import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const API_URL = 'http://localhost:3000/articles';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);

   const navigate = useNavigate();
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
    // Fetch articles from the API
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

   return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>View Articles</Link>
        <Link to="/add">Add Article</Link>
      </nav>

      <h2>Articles</h2>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong><br />
            <small>
              By Journalist #{article.journalistId} | Category #{article.categoryId}
            </small><br />

            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => navigate(`/update/${article.id}`)}>Update</button>
            <button onClick={() => navigate(`/articles/${article.id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
