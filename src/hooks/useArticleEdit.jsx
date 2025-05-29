import { useEditArticleMutation } from '../store/api';

const useArticleEdit = () => {
  const [editArticle] = useEditArticleMutation();

  const handleEdit = async (id, articleData) => {
    try {
      await editArticle({ id, ...articleData }).unwrap();
      return true;
    } catch (error) {
      console.error('Failed to edit article:', error);
      return false;
    }
  };

  return { handleEdit };
};

export default useArticleEdit; 