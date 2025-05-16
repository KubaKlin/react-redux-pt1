import { Container, Box, Typography, Button } from '@mui/material';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { ArticleModal } from './components/ArticleModal/ArticleModal';
import useLocalStorage from './hooks/useLocalStorage';
import useArticleEdit from './hooks/useArticleEdit';
import useArticleCreate from './hooks/useArticleCreate';
import { SortButton } from './components/SortButton/SortButton.jsx';
import useArticleList from './hooks/useArticleList.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from './store/modalSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isOpen: isModalOpen, modalType } = useSelector((state) => state.modal);
  
  const [favoriteArticles, setFavoriteArticles] = useLocalStorage(
    'favoriteArticles',
    [],
  );

  const {
    isSorted,
    handleToggleSort,
  } = useArticleList();

  const {
    editingArticle,
    handleOpen: handleEditOpen,
    handleClose: handleEditClose,
  } = useArticleEdit();
  const {
    handleOpen: handleCreateOpen,
    handleClose: handleCreateClose,
  } = useArticleCreate();

  const handleToggleFavorite = (articleId) => {
    setFavoriteArticles((previous) => {
      if (previous.includes(articleId)) {
        return previous.filter((id) => id !== articleId);
      }
      return [...previous, articleId];
    });
  };

  const currentArticle = editingArticle;
  const isEditing = modalType === 'edit';

  const handleModalClose = () => {
    dispatch(closeModal());
    if (isEditing) {
      handleEditClose();
    } else {
      handleCreateClose();
    }
  };

  const handleCreateClick = () => {
    dispatch(openModal('create'));
    handleCreateOpen();
  };

  const handleEditClick = (article) => {
    dispatch(openModal('edit'));
    handleEditOpen(article);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Articles list
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleCreateClick}
            >
              Add new article
            </Button>
            <SortButton isSorted={isSorted} onToggleSort={handleToggleSort} />
          </Box>
          <ArticleModal
            open={isModalOpen}
            onClose={handleModalClose}
            isEditing={isEditing}
            article={currentArticle}
          />
        </Box>
        <ArticlesList
          favoriteArticles={favoriteArticles}
          onToggleFavorite={handleToggleFavorite}
          onEdit={handleEditClick}
        />
      </Box>
    </Container>
  );
};

export default App;
