import { useState, useMemo } from 'react';
import { useGetArticlesQuery } from '../store/api';

const useArticleList = () => {
  const [isSorted, setIsSorted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: articles = [], refetch } = useGetArticlesQuery();

  const handleToggleSort = () => {
    setIsSorted(prev => !prev);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredAndSortedArticles = useMemo(() => {
    let result = [...articles];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.content.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (isSorted) {
      result.sort((a, b) => a.content.length - b.content.length);
    }

    return result;
  }, [articles, searchQuery, isSorted]);

  return {
    articles: filteredAndSortedArticles,
    isSorted,
    searchQuery,
    handleToggleSort,
    handleSearchChange,
    refreshArticles: refetch
  };
};

export default useArticleList; 