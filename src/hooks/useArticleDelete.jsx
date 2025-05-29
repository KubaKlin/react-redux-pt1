import { useDeleteArticleMutation } from '../store/api';

const useArticleDelete = () => {
  const [deleteArticle] = useDeleteArticleMutation();

  const handleDelete = async (articleId) => {
    try {
      await deleteArticle(articleId).unwrap();
      return true;
    } catch (error) {
      console.error('Failed to delete article:', error);
      return false;
    }
  };

  return { handleDelete };
};

export default useArticleDelete; 