import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSorted, toggleSort } from '../../store/sortSlice.jsx';

const SortButton = () => {
  const dispatch = useDispatch();
  const isSorted = useSelector(selectIsSorted);
  const handleToggleSort = () => {
    dispatch(toggleSort());
  };
  return (
    <Button
      size="small"
      variant="outlined"
      sx={{ mb: 2 }}
      onClick={handleToggleSort}
      color={isSorted ? 'primary' : 'inherit'}
    >
      {isSorted ? 'Sorted ascending' : 'Sort by length'}
    </Button>
  );
};

export default SortButton;
