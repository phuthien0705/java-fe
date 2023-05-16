import { ITotalQuantity } from '@/interfaces/compontents/statistic.interface';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TotalQuantity: React.FunctionComponent<ITotalQuantity> = ({ data }) => {
  const matches = useMediaQuery('(min-width:900px)');
  const create_xaxis_data: any = () => {
    if (!data) return [];
    let xaxis_data: any[] = [];
    data?.forEach((item: any) => {
      xaxis_data.push(item?.order_date);
    });
    return xaxis_data;
  };
  const create_series: any = () => {
    if (!data) return [];

    let series_data_quantity: any = { name: 'Số lượng bán ra', data: [] };
    let series_data_order: any = { name: 'Số lượng đơn hàng', data: [] };

    data?.forEach((item: any) => {
      series_data_quantity.data.push(item?.quantity);
      series_data_order.data.push(item?.total_order);
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
    series: create_series() as any,
  };
  return (
    <Box
      className="shadow"
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        p: 2,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 600, color: '#000' }}>
          Số lượng bán
        </Typography>
      </Box>
      <Chart
        options={chartInfo.options as any}
        series={chartInfo.series}
        type="bar"
        width={matches ? 900 : 600}
      />
    </Box>
  );
};

export default TotalQuantity;
