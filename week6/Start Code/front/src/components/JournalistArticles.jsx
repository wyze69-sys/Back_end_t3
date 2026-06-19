import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticlesByJournalistId } from "../services/api";

export default function JournalistArticles() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getArticlesByJournalistId(id);
      setArticles(data);
    } catch (err) {
      setError("Failed to load journalist articles.");
    } finally {
      setLoading(false);
    }
  };

  const journalistName = articles[0]?.journalist_name || articles[0]?.journalist || `#${id}`;

  if (loading) return <p>Loading journalist articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Articles by {journalistName}</h2>
      {articles.length === 0 ? (
        <p>No articles found for this journalist.</p>
      ) : (
        <div className="article-list">
          {articles.map((article) => (
            <div className="article-card" key={article.id}>
              <div className="article-title">{article.title}</div>
              <div className="article-author">Categories: {article.categories || article.category}</div>
              <p>{article.content}</p>
              <Link to={`/articles/${article.id}`}>View Article</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
