import { Box } from '@mui/material';
import React from 'react';

const LoadingScreen: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        marginLeft: 0,
        marginRight: 0,
        scale: '0.75',
        height: '100vh',
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <div className="bookshelf_wrapper">
        <ul className="books_list">
          <li className="book_item first" />
          <li className="book_item second" />
          <li className="book_item third" />
          <li className="book_item fourth" />
          <li className="book_item fifth" />
          <li className="book_item sixth" />
        </ul>
        <div className="shelf" />
      </div>
    </Box>
  );
};

export default LoadingScreen;
