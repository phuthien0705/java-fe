import { Avatar, Box, ButtonBase } from '@mui/material';
import { IconShoppingCart } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Badge from '@mui/material/Badge';
import { ICartSection } from '@/interfaces/compontents/cart.interface';
import authService from '@/services/authService';

const CartSection: React.FunctionComponent<ICartSection> = ({
  data,
  isLoading,
  isFetching,
  refetch,
}) => {
  const theme: any = useTheme();
  const router = useRouter();

  const handleClickCart = useCallback(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
    } else if (!router.pathname.includes('/cart')) {
      router.push('/cart');
    }
  }, [router]);

  return (
    <Box
      onClick={() => handleClickCart()}
      sx={{
        ml: 1.5,
        mr: 1.5,
      }}
    >
      <ButtonBase sx={{ borderRadius: '12px' }} className="shadow">
        <Badge badgeContent={data ? data?.length : 0} color="primary">
          <Avatar
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
            <IconShoppingCart stroke={1.5} size="1.3rem" />
          </Avatar>
        </Badge>
      </ButtonBase>
    </Box>
  );
};

export default CartSection;
