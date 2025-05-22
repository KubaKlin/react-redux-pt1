import { Box, Modal, Typography } from '@mui/material';
import { ArticleForm } from '../ArticleForm/ArticleForm';
import handleCreate from './handleCreate';
import useArticleEdit from '../../hooks/useArticleEdit';
import { closeModal } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ArticleModal = ({ open, isEditing, article, refreshArticles }) => {
  const dispatch = useDispatch();
  const { handleEdit } = useArticleEdit();

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = async (articleData) => {
    let success;
    if (isEditing) {
      success = await handleEdit(article.id, articleData);
    } else {
      success = await handleCreate(articleData);
    }
    if (success && refreshArticles) refreshArticles();
    return success;
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="article-modal-title"
      aria-describedby="article-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="article-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          {isEditing ? 'Edit article' : 'Add new article'}
        </Typography>
        <ArticleForm
          article={article}
          isEditing={isEditing}
          onSubmit={handleSubmit}
        />
      </Box>
    </Modal>
  );
};
