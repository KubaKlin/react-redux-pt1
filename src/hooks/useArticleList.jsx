import { useState, useMemo } from 'react';
import { useGetArticlesQuery } from '../store/api';
import { useSelector } from 'react-redux';
import { selectIsSorted } from '../store/sortSlice.jsx';

const useArticleList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: articles = [], refetch } = useGetArticlesQuery();
  const isSorted = useSelector(selectIsSorted);

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

    if (isSorted) {
      result.sort((a, b) => a.content.length - b.content.length);
    }

    return result;
  }, [articles, searchQuery, isSorted]);

  return {
    articles: filteredAndSortedArticles,
    isSorted,
    searchQuery,
    handleSearchChange,
    refreshArticles: refetch
  };
};

export default useArticleList; 