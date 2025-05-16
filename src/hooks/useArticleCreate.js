import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../store/modalSlice';

const useArticleCreate = () => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openModal('create'));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleCreate = async (newArticle) => {
    try {
      const response = await fetch('http://localhost:3010/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      return true;
    } catch (error) {
      console.error('Error creating article:', error);
      return false;
    }
  };

  return {
    handleOpen,
    handleClose,
    handleCreate,
  };
};

export default useArticleCreate;
