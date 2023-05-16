import { ITotalEarning } from '@/interfaces/compontents/statistic.interface';
import { moneyFormat } from '@/utils/moneyFormat';
import { Box, Typography } from '@mui/material';

const TotalEarning: React.FunctionComponent<ITotalEarning> = ({ data }) => {
  const calcTotalEarning = () => {
    if (data?.length === 0) return 0;
    let total = 0;
    (data || [])?.forEach((item: any) => {
      total += item?.sales;
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
        {moneyFormat(calcTotalEarning())}
      </Typography>
      <Typography sx={{ fontWeight: 600, color: 'rgba(0,0,0,0.5)' }}>
        Số tiền thu được
      </Typography>
    </Box>
  );
};

export default TotalEarning;
