import { TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectSearchQuery } from '../../store/searchSlice';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <Box sx={{ pt: 2, px: 2, background: '#efefef' }}>
      <TextField
        fullWidth
        label="Search articles by title or content"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ background: '#fff' }}
      />
    </Box>
  );
};
