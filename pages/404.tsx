import { styled } from '@mui/material/styles';
import Empty404 from '@/components/empty/Empty404';
const NotFoundStyle = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const NotFoundPage = () => {
  return (
    <NotFoundStyle>
      <Empty404 />
    </NotFoundStyle>
  );
};

export default NotFoundPage;
