import { ICustomChip } from '@/interfaces/compontents/chip.interface';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const CustomChip: React.FunctionComponent<ICustomChip> = ({
  content,
  type = 'default',
}) => {
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        borderRadius: '2px',
        color:
          type === 'success'
            ? theme.palette.success.main
            : type === 'error'
            ? theme.palette.error.main
            : theme.palette.dark.dark,
        backgroundColor:
          type === 'success'
            ? 'rgba(185, 246, 202, 0.376)'
            : type === 'error'
            ? 'rgba(239, 154, 154, 0.376)'
            : 'rgba(0, 0, 0, 0.2)',

        padding: '3px 6px',
      }}
    >
      <Typography fontSize="12px">{content}</Typography>
    </Box>
  );
};

export default CustomChip;
