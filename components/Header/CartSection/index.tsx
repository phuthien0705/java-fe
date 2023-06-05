import { Avatar, Box, ButtonBase, useTheme } from '@mui/material';
import { IconShoppingCart } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Badge from '@mui/material/Badge';
import { ICartSection } from '@/interfaces/compontents/cart.interface';
import authService from '@/services/authService';
import { EPathName } from '@/constants/pathname';

const CartSection: React.FunctionComponent<ICartSection> = ({ data }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleClickCart = useCallback(() => {
    if (!authService.isAuthenticated()) {
      router.push(EPathName.LOGIN);
    } else if (!router.pathname.includes(EPathName.CART)) {
      router.push(EPathName.CART);
    }
  }, [router]);

  return (
    <Box
      onClick={() => handleClickCart()}
      sx={{
        ml: theme.spacing(1.5),
        mr: theme.spacing(1),
      }}
    >
      <ButtonBase sx={{ borderRadius: '12px' }} className="shadow">
        <Badge badgeContent={data ? data?.length : 0} color="primary">
          <Avatar
            variant="rounded"
            sx={{
              cursor: 'pointer',
              borderRadius: theme.spacing(1),
              width: theme.spacing(4.25),
              height: theme.spacing(4.25),
              fontSize: theme.spacing(2.4),
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
