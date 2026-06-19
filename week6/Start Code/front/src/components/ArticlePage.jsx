import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);

      const found = await getArticleById(id);
      if (found) {
        setArticle(found);
        setError("");
      } else {
        setArticle(null);
        setError("Article not found.");
      }
    } catch (err) {
      setError("Failed to fetch article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist:</strong>{" "}
        {article.journalist_id ? (
          <Link to={`/journalists/${article.journalist_id}/articles`}>
            {article.journalist_name || article.journalist}
          </Link>
        ) : (
          article.journalist
        )}
      </div>
      {article.journalist_email && (
        <div>
          <strong>Email:</strong> {article.journalist_email}
        </div>
      )}
      {article.journalist_bio && (
        <div>
          <strong>Bio:</strong> {article.journalist_bio}
        </div>
      )}
      <div>
        <strong>Category:</strong> {article.categories || article.category}
      </div>
    </div>
  );
}
