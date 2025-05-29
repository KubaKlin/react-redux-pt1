import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const storedFavorites = localStorage.getItem('favoriteArticles');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const initialState = {
  favoriteArticles: loadFavoritesFromStorage(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const articleId = action.payload;
      const index = state.favoriteArticles.indexOf(articleId);
      
      if (index === -1) {
        state.favoriteArticles.push(articleId);
      } else {
        state.favoriteArticles.splice(index, 1);
      }
      
      localStorage.setItem('favoriteArticles', JSON.stringify(state.favoriteArticles));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer; 