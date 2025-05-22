import { Box, Modal, Typography } from '@mui/material';
import { ArticleForm } from '../ArticleForm/ArticleForm';
import useArticleEdit from '../../hooks/useArticleEdit';
import { closeModal } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { useCreateArticleMutation } from '../../store/api';

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
  const [createArticle] = useCreateArticleMutation();

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = async (articleData) => {
    let success;
    if (isEditing) {
      success = await handleEdit(article.id, articleData);
    } else {
      try {
        await createArticle(articleData).unwrap();
        success = true;
      } catch (error) {
        console.error('Error creating article:', error);
        success = false;
      }
    }
    if (success) {
      if (refreshArticles) refreshArticles();
      handleModalClose();
    }
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
