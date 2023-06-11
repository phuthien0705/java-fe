import { ITotalSold } from '@/interfaces/compontents/statistic.interface';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';

const TotalSold: React.FunctionComponent<ITotalSold> = ({
  data,
  isLoading,
}) => {
  const theme = useTheme();
  const calcTotalEarning = () => {
    if (data.length === 0) return 0;
    let total = 0;
    (data || [])?.forEach((item) => {
      total += item.totalSold;
    });
    return total;
  };
  return (
    <Box
      className="shadow"
      sx={{
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width={'100%'} height={100} />
      ) : (
        <Box sx={{ padding: theme.spacing(2) }}>
          <Typography sx={{ fontWeight: 600, color: 'rgba(0,0,0,0.5)' }}>
            Số sách bán ra
          </Typography>
          <Typography sx={{ fontWeight: 600, color: '#000' }}>
            {calcTotalEarning()} quyển
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default TotalSold;
