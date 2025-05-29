import { Container, Box, Typography, Button } from '@mui/material';
import { ArticlesList } from './components/ArticlesList/ArticlesList';
import { ArticleModal } from './components/ArticleModal/ArticleModal';
import SortButton from './components/SortButton/SortButton';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from './store/modalSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isOpen: isModalOpen, modalType } = useSelector((state) => state.modal);

  const isEditing = modalType === 'edit';

  const handleCreateClick = () => {
    dispatch(openModal('create'));
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
            <SortButton />
          </Box>
          <ArticleModal
            open={isModalOpen}
            isEditing={isEditing}
          />
        </Box>
        <ArticlesList />
      </Box>
    </Container>
  );
};

export default App;
