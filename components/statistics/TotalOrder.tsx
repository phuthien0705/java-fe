import { Box, Typography } from '@mui/material';
import { moneyFormat } from '@/utils/moneyFormat';
import { ITotalOrder } from '@/interfaces/compontents/statistic.interface';

const TotalOrder: React.FunctionComponent<ITotalOrder> = ({ data }) => {
  const calcTotalEarning = () => {
    if (data?.length === 0) return 0;
    let total = 0;
    (data || [])?.forEach((item: any) => {
      total += item?.quantity;
    });
    return total;
  };
  return (
    <Box
      className="shadow"
      sx={{
        backgroundColor: '#fff',
        p: 2,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
      }}
    >
      <Typography sx={{ fontWeight: 600, color: '#000' }}>
        {calcTotalEarning()} quyển
      </Typography>
      <Typography sx={{ fontWeight: 600, color: 'rgba(0,0,0,0.5)' }}>
        Số sách bán ra
      </Typography>
    </Box>
  );
};
export default TotalOrder;
