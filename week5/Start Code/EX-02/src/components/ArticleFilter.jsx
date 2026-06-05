import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [journalistFilter, setJournalistFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const response = await axios.get(`${API_URL}/articles`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const response = await axios.get(`${API_URL}/journalists`);
      setJournalists(response.data);
    } catch (error) {
      console.error('Error fetching journalists:', error);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const applyFilters = async () => {
    const params = {};

    if (journalistFilter) {
      params.journalistId = journalistFilter;
    }

    if (categoryFilter) {
      params.categoryId = categoryFilter;
    }

    try {
      const response = await axios.get(`${API_URL}/articles`, { params });
      setArticles(response.data);
    } catch (error) {
      console.error('Error filtering articles:', error);
    }
  };

  const resetFilters = () => {
    setJournalistFilter('');
    setCategoryFilter('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={journalistFilter}
          onChange={(e) => setJournalistFilter(e.target.value)}
        >
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            applyFilters();
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            resetFilters();
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
