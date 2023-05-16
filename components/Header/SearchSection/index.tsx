import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Popper,
  useMediaQuery,
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useRouter } from 'next/router';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 300,
    height: 33,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
      background: 'transparent !important',
      paddingLeft: '4px !important',
    },
    [theme.breakpoints.down('lg')]: {
      width: 250,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 0,
      background: '#fff',
    },
  })
);

const SearchSection = () => {
  const inputRef = useRef<any>(null);
  const router = useRouter();
  const theme = useTheme();
  const [value, setValue] = useState('');
  const matches = useMediaQuery('(min-width:900px)');
  const handleClearSearch = () => {
    setValue('');
    if (router?.pathname === '/product') {
      router.push({ pathname: 'product' });
    }
  };
  const handleSearch = useCallback(() => {
    if (router?.pathname !== '/product') {
      router.push({ pathname: '/product', query: { search: value } });
    }
  }, [router, value]);

  useEffect(() => {
    const inputRefCurrent = inputRef?.current;
    const handleKeyPress = function (event: any) {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };
    inputRefCurrent?.addEventListener('keypress', handleKeyPress);

    return () => {
      inputRefCurrent?.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleSearch]);

  return (
    <>
      <Box
        sx={{
          with: '100%',
          marginRight: 0.25,
          marginLeft: { xs: 0, md: 1.5 },
          flex: '1 1 0%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          className="shadow"
          sx={{
            width: matches ? 'fit-content' : '100%',

            borderRadius: '8px',
            '.css-wmrpzn-MuiOutlinedInput-notchedOutline': {
              border: 'none !important',
            },
            '.MuiOutlinedInput-notchedOutline': { border: 'none !important' },
          }}
        >
          {' '}
          <OutlineInputStyle
            ref={inputRef}
            sx={{
              width: matches ? '300px' : '100%',
              border: 'none',
              margin: 0,
            }}
            id="input-search-header"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tìm kiếm sản phẩm tại đây"
            startAdornment={
              <InputAdornment position="start">
                <IconSearch
                  stroke={1.5}
                  size="1rem"
                  color={theme.palette.grey[500]}
                />
              </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SearchSection;
