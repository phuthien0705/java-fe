import { Paper, Container, Typography } from '@mui/material';
import ProductLayout from '../layout/ProductLayot/index';
import MainCard from '../components/cards/MainCard';
import AccountTabs from '../components/profile/AccountTabs';
import useGetUserProfile from '@/hooks/client/useGetUserProfile';

const Profile = () => {
  const { data } = useGetUserProfile();

  return (
    <ProductLayout>
      <Container sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <Paper
          className="shadow"
          sx={{ backgroundColor: '#fff', px: 2, py: 2, mb: { xs: 1, md: 2 } }}
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
