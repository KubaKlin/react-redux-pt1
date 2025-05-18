import { Button, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ArticleModal } from '../ArticleModal/ArticleModal';
import useArticleDelete from '../../hooks/useArticleDelete';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';
import { toggleFavorite } from '../../store/favoritesSlice';

export const ArticleEdit = ({ article, refreshArticles }) => {
  const dispatch = useDispatch();
  const { isOpen, modalType, articleData } = useSelector((state) => state.modal);
  const { handleDelete } = useArticleDelete();
  const favoriteArticles = useSelector((state) => state.favorites.favoriteArticles);
  const isFavorite = favoriteArticles.includes(article.id)

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(article.id));
  };

  const handleEditClick = () => {
    dispatch(openModal({ type: 'edit', article }));
  };
  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = async () => {
    try {
      const success = await handleDelete(article.id);
      if (success && refreshArticles) {
        refreshArticles();
      }
    } catch (error) {
      console.error('Error removing article:', error);
    }
  };

  return (
    <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditClick}
        aria-label="Edit article"
        size="small"
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={handleRemove}
        aria-label="Remove article"
      >
        Remove
      </Button>
      <IconButton
        onClick={handleToggleFavorite}
        color={isFavorite ? 'primary' : 'default'}
        size="small"
      >
        {isFavorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
      <ArticleModal
        open={isOpen && modalType === 'edit'}
        onClose={handleModalClose}
        isEditing={true}
        article={articleData}
        refreshArticles={refreshArticles}
      />
    </Box>
  );
};
