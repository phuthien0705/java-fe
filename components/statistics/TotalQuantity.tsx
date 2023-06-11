import { Box, Skeleton, Typography, styled, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ITotalQuantity } from '@/interfaces/compontents/statistic.interface';
import convertToISO from '@/utils/convertToISO';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const QuantityChart = styled(Chart)(`
  max-width: 100%;
  * {
    max-width: 100%;
  }
`);

const TotalQuantity: React.FunctionComponent<ITotalQuantity> = ({
  data,
  isLoading,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:900px)');
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

    let series_data_quantity: { name: string; data: number[] } = {
      name: 'Số lượng bán ra',
      data: [],
    };
    let series_data_order: { name: string; data: number[] } = {
      name: 'Số lượng đơn hàng',
      data: [],
    };

    data.forEach((item) => {
      series_data_quantity.data.push(item.totalSold);
      series_data_order.data.push(item.totalOrder);
    });

    return [series_data_quantity, series_data_order];
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
    series: create_series(),
  };
  return (
    <Box
      className="shadow"
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        p: 3,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100%',
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width={'100%'} height={100} />
      ) : (
        <Box sx={{ padding: theme.spacing(2) }}>
          <Typography sx={{ fontWeight: 600, color: '#000' }} mb={2}>
            Số lượng bán
          </Typography>
          <QuantityChart
            options={chartInfo.options as any}
            series={chartInfo.series}
            type="bar"
            width={matches ? 900 : 600}
          />
        </Box>
      )}
    </Box>
  );
};

export default TotalQuantity;
