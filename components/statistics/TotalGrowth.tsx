import { Box, Skeleton, Typography, styled, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ITotalGrowth } from '@/interfaces/compontents/statistic.interface';
import convertToISO from '@/utils/convertToISO';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const GrowthChart = styled(Chart)(`
  max-width: 100%;
  * {
    max-width: 100%;
  }
`);
const TotalGrowth: React.FunctionComponent<ITotalGrowth> = ({
  data,
  isLoading,
}) => {
  const matches = useMediaQuery('(min-width:900px)');
  const theme = useTheme();
  const create_xaxis_data = () => {
    if (data.length === 0) return [];
    let xaxis_data: string[] = [];
    data.forEach((item) => {
      xaxis_data.push(convertToISO(item.monthYear));
    });
    return xaxis_data;
  };
  const create_series = () => {
    if (!data) return [];

    let series_data_earning: { name: string; data: number[] } = {
      name: 'Số tiền thu được',
      data: [],
    };
    let series_data_profit: { name: string; data: number[] } = {
      name: 'Lợi nhuận',
      data: [],
    };

    data.forEach((item) => {
      series_data_earning.data.push(item.totalRevenue);
      series_data_profit.data.push(item.profit);
    });

    return [series_data_profit, series_data_earning];
  };
  const chartInfo = {
    options: {
      chart: {
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: { type: 'datetime', categories: create_xaxis_data() },
    },
    series: create_series() as any,
  };
  return (
    <Box
      className="shadow"
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width={'100%'} height={100} />
      ) : (
        <Box sx={{ padding: theme.spacing(3) }}>
          <Typography sx={{ fontWeight: 600, color: '#000' }} mb={2}>
            Doanh thu
          </Typography>
          <GrowthChart
            options={chartInfo.options as any}
            series={chartInfo.series}
            type="area"
            width={matches ? 900 : 600}
          />
        </Box>
      )}
    </Box>
  );
};

export default TotalGrowth;
