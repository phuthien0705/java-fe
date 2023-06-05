import { EOrderStatus } from '@/interfaces/compontents/order.interface';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { style } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const statusMaping = (
  title: string
): { content: string; color: string; icon: React.ReactNode | null } => {
  switch (title) {
    case EOrderStatus.PENDING:
      return {
        content: 'Đang xử lý',
        color: '#FFB302',
        icon: <PendingActionsIcon sx={{ color: 'black' }} />,
      };
    case EOrderStatus.PAID:
      return {
        content: 'Đã thanh toán',
        color: '#FCE83A',
        icon: <CreditScoreIcon sx={{ color: 'black' }} />,
      };
    case EOrderStatus.SHIPPED:
      return {
        content: 'Đã lấy hàng, chuẩn bị giao',
        color: '#2DCCFF',
        icon: <ContentPasteGoIcon sx={{ color: 'black' }} />,
      };
    case EOrderStatus.DELIVERED:
      return {
        color: '#56F000',
        content: 'Giao thành công',
        icon: <CheckBoxIcon sx={{ color: 'black' }} />,
      };
    case EOrderStatus.CANCELED:
      return {
        content: 'Đã Hủy',
        color: '#A4ABB6',
        icon: <LocalShippingIcon sx={{ color: 'black' }} />,
      };
    default:
      return {
        color: 'error',
        content: 'Chưa xác định',
        icon: null,
      };
  }
};
export default statusMaping;
