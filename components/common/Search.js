import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from '../../styles/Search.module.css';

const Search = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const searchPosts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (slug) => {
    router.push(`/blog/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <FiX />
        </button>
        
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <FiSearch className={styles.icon} />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            autoFocus
          />
        </form>

        {loading && (
          <div className={styles.loading}>Searching...</div>
        )}

        {!loading && results.length > 0 && (
          <div className={styles.results}>
            {results.map(post => (
              <div 
                key={post.id} 
                className={styles.result}
                onClick={() => handleResultClick(post.slug)}
              >
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className={styles.category}>{post.category}</span>
              </div>
            ))}
          </div>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <div className={styles.noResults}>
            <p>No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;