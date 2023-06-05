import { useState } from 'react';
import {
  Avatar,
  Box,
  ButtonBase,
  ListItemButton,
  ListItemText,
  Menu,
  MenuList,
  Typography,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconCategory2 } from '@tabler/icons';
import useGetListGenreClient from '@/hooks/genre/useGetListGenreClient';
import { FormattedMessage } from 'react-intl';

const GenreSection: React.FunctionComponent = () => {
  const theme: any = useTheme();
  const router = useRouter();
  const matches = useMediaQuery('(min-width:900px)');

  const getListGenreQuery = useGetListGenreClient();
  const { data: genreData, isLoading: isGenreLoading } = getListGenreQuery;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRedirectToProduct = () => {
    router.push({ pathname: '/product' });
  };
  const handleClick = (id: any) => {
    router.push({ pathname: `/product`, query: { genre: id } });
  };

  const open = Boolean(anchorEl);
  return (
    <Box sx={{ cursor: 'pointer' }}>
      {matches ? (
        <ButtonBase
          onClick={handleOpen}
          sx={{
            cursor: 'pointer',
            width: '110%',
            height: '40px',
            transition: 'all .2s ease-in-out',
            background: '#ffffff',
            color: theme.palette.secondary.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: '#ffffff',
              color: theme.palette.secondary.dark,
            },
          }}
        >
          <Typography
            sx={{
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            <FormattedMessage id={'sidebar.product'} />
          </Typography>
        </ButtonBase>
      ) : (
        <Avatar
          onClick={handleOpen}
          variant="rounded"
          sx={{
            cursor: 'pointer',
            borderRadius: '8px',
            width: '34px',
            height: '34px',
            fontSize: '1.2rem',
            transition: 'all .2s ease-in-out',
            background: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.primary.dark,
              color: theme.palette.primary.light,
            },
          }}
          color="inherit"
        >
          <IconCategory2 stroke={1.5} size="1.3rem" />
        </Avatar>
      )}

      <Menu
        id="menu-genre"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={2}
        sx={{
          marginTop: 1.7,
          height: '500px',
          '.MuiList-root': {
            border: 'none !important',
            outline: 'none !important',
            padding: 0,
          },
        }}
      >
        <MenuList
          sx={{
            border: 'none',
          }}
        >
          {isGenreLoading ? (
            <ListItemButton>
              <ListItemText>
                {' '}
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              </ListItemText>
            </ListItemButton>
          ) : (
            <>
              <ListItemButton onClick={() => handleRedirectToProduct()}>
                <ListItemText>{'Đến trang sản phẩm'}</ListItemText>
              </ListItemButton>
              {genreData?.data?.map((genre: any, index: number) => {
                return (
                  <ListItemButton
                    onClick={() => handleClick(genre?.id)}
                    key={index}
                  >
                    <ListItemText>{genre?.name}</ListItemText>
                  </ListItemButton>
                );
              })}
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default GenreSection;
