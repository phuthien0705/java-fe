import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useMutation } from 'react-query';
import { partStatisticTime } from '@/utils/parseTime';
import TotalEarning from '@/components/statistics/TotalEarning';
import TotalGrowth from '@/components/statistics/TotalGrowth';
import { getStatistic } from '@/apis/statistic.api';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { useToast } from '@/hooks/useToast';
import TotalQuantity from '@/components/statistics/TotalQuantity';
import AdminLayout from '@/layout/AdminLayout';

import TotalSold from '@/components/statistics/TotalSold';
import TotalOrder from '@/components/statistics/TotalOrder';
import TotalProfit from '@/components/statistics/TotalProfit';
import calcProfit from '@/common/calcProfit';
import {
  IEachStatisticData,
  IEachStatisticWithProfitData,
} from '@/interfaces/statistic.interface';

const Statistic = () => {
  const date = new Date();
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const theme = useTheme();
  const [data, setData] = useState<IEachStatisticWithProfitData[]>([]);
  const [fromDate, setFromDate] = useState(
    partStatisticTime(
      new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        date.getDate()
      ).toISOString()
    )
  );
  const [toDate, setToDate] = useState(
    partStatisticTime(new Date().toISOString())
  );
  const { mutate: getData, isLoading } = useMutation(
    (data: { fromDate: string; toDate: string }) => getStatistic(data),
    {
      onSuccess: (data: IEachStatisticData[]) => {
        setData(
          data.map((i) => ({
            ...i,
            totalRevenue: Math.round(i.totalRevenue),
            profit: Math.round(calcProfit(i.totalRevenue)),
          }))
        );
      },
      onError: () => {
        toast({ type: 'error', message: 'Lỗi trong quá trình lấy dữ liệu' });
      },
    }
  );

  useEffect(() => {
    getData({
      fromDate: partStatisticTime(fromDate),
      toDate: partStatisticTime(toDate),
    });
  }, [fromDate, getData, toDate]);

  return (
    <AdminLayout>
      <Grid
        container
        spacing={{ md: theme.spacing(2), xs: theme.spacing(1) }}
        sx={{ px: { md: theme.spacing(1), xs: 0 } }}
      >
        <Grid item xs={12}>
          <Stack
            direction="row"
            spacing={theme.spacing(1)}
            justifyContent={'center'}
          >
            <Stack spacing={theme.spacing(0.5)}>
              <Typography>Từ ngày</Typography>
              <OutlinedInput
                id="outlined-adornment-fromdate"
                type="date"
                value={fromDate}
                name="fromDate"
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
                inputProps={{}}
              />
            </Stack>
            <Stack spacing={theme.spacing(0.5)}>
              <Typography>Đến ngày</Typography>
              <OutlinedInput
                id="outlined-adornment-toDate"
                type="date"
                value={toDate}
                name="toDate"
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
                inputProps={{}}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} md={3}>
          <TotalEarning data={data ?? []} isLoading={isLoading} />
        </Grid>
        <Grid item xs={6} md={3}>
          <TotalSold data={data ?? []} isLoading={isLoading} />
        </Grid>
        <Grid item xs={6} md={3}>
          <TotalOrder data={data ?? []} isLoading={isLoading} />
        </Grid>
        <Grid item xs={6} md={3}>
          <TotalProfit data={data ?? []} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12}>
          <TotalQuantity data={data ?? []} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12}>
          <TotalGrowth data={data ?? []} isLoading={isLoading} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default dynamic(() => Promise.resolve(Statistic), {
  ssr: false,
});
