import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/articles';

export default function ArticleViewer() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setArticle(response.data);
      } catch {
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>

      <div>
        <strong>Journalist ID:</strong> {article.journalistId}
      </div>

      <div>
        <strong>Category ID:</strong> {article.categoryId}
      </div>
    </div>
  );
}
