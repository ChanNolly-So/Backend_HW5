import { useEffect, useState } from 'react';
import axios from 'axios';
export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);          
  const [selectedJournalistId, setSelectedJournalistId] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get('http://localhost:5000/journalists');
      setJournalists(res.data);
    } catch (err) {
      console.error('Error fetching journalists:', err);
    }
  };
  const applyFilters = async () => {
    try {
      if (!selectedJournalistId) { fetchArticles(); return; }
      const res = await axios.get(`http://localhost:5000/journalists/${selectedJournalistId}/articles`);
      setArticles(res.data);
    } catch (err) {
      console.error('Error filtering by journalist:', err);
    }
  };

  const resetFilters = () => {
    setSelectedJournalistId('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
         {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>

        <button
          onClick={applyFilters}
        >Apply Filters</button>
        <button
          onClick={resetFilters}
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
};