import { List, ListItem, Typography, Box } from '@mui/material';
import { ArticleEdit } from '../ArticleEdit/ArticleEdit';
import { SearchBar } from '../SearchBar/SearchBar';
import useArticleList from '../../hooks/useArticleList';

export const ArticlesList = () => {
  const { articles, refreshArticles } = useArticleList();

  return (
    <>
      <SearchBar />
      <List sx={{ background: '#efefef' }}>
        {articles.map((article) => (
          <ListItem key={article.id} sx={{ display: 'block' }}>
            <Box
              sx={{
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                backgroundColor: '#fff',
              }}
            >
              <Typography variant="h6" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.content}
              </Typography>
              <ArticleEdit
                article={article}
                refreshArticles={refreshArticles}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};
