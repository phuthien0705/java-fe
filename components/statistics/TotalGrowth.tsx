import { ITotalGrowth } from '@/interfaces/compontents/statistic.interface';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import useMediaQuery from '@mui/material/useMediaQuery';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TotalGrowth: React.FunctionComponent<ITotalGrowth> = ({ data }) => {
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

    let series_data_earning: any = { name: 'Số tiền thu được', data: [] };
    let series_data_profit: any = { name: 'Lợi nhuận', data: [] };

    data?.forEach((item: any) => {
      series_data_earning.data.push(item?.sales);
      series_data_profit.data.push(item?.profit);
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
        p: 2,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 600, color: '#000' }}>
          Doanh thu
        </Typography>
      </Box>
      <Chart
        options={chartInfo.options as any}
        series={chartInfo.series}
        type="area"
        width={matches ? 900 : 600}
      />
    </Box>
  );
};

export default TotalGrowth;
