import { Paper, Container, Typography, useTheme } from '@mui/material';
import ProductLayout from '../layout/ProductLayot/index';
import MainCard from '../components/cards/MainCard';
import AccountTabs from '../components/profile/AccountTabs';
import useGetUserProfile from '@/hooks/user/useGetUserProfile';

const Profile = () => {
  const { data } = useGetUserProfile();
  const theme = useTheme();
  return (
    <ProductLayout>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', mb: theme.spacing(2) }}
      >
        <Paper
          className="shadow"
          sx={{
            backgroundColor: '#fff',
            px: theme.spacing(2),
            py: theme.spacing(2),
            mb: { xs: theme.spacing(1), md: theme.spacing(2) },
          }}
        >
          <Typography variant="h3">Cài Đặt Tài Khoản</Typography>
        </Paper>
        <MainCard title={data && data?.name} darkTitle>
          <AccountTabs />
        </MainCard>
      </Container>
    </ProductLayout>
  );
};
export default Profile;
