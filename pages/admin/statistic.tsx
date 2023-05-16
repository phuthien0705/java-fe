import AdminLayout from '@/layout/AdminLayout';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { partStatisticTime } from '@/utils/parseTime';
import TotalEarning from '@/components/statistics/TotalEarning';
import TotalOrder from '@/components/statistics/TotalOrder';
import TotalGrowth from '@/components/statistics/TotalGrowth';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { getStatistic } from '@/apis/statistic.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { useToast } from '@/hooks/useToast';
import TotalQuantity from '@/components/statistics/TotalQuantity';

const Statistic = () => {
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);

  const [data, setData] = useState<any>([]);
  const [filter, setFilter] = useState<'month' | 'year'>('month');
  const date = new Date();
  const { mutate: getData, isLoading } = useMutation(
    (data: any) => getStatistic(data),
    {
      onSuccess: (data: any) => {
        setData(data?.data);
      },
      onError: () => {
        toast({ type: 'error', message: 'Lỗi trong quá trình lấy dữ liệu' });
      },
    }
  );

  useEffect(() => {
    getData({
      startDate: partStatisticTime(
        filter === 'month'
          ? new Date(
              date.getFullYear(),
              date.getMonth() - 1,
              date.getDate()
            ).toISOString()
          : new Date(
              date.getFullYear() - 1,
              date.getMonth(),
              date.getDate()
            ).toISOString()
      ),
      endDate: partStatisticTime(new Date().toISOString()),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <AdminLayout>
      <Grid container spacing={{ md: 2, xs: 1 }} sx={{ px: { md: 1, xs: 0 } }}>
        <Grid sx={{ pt: '0 !important' }} item xs={12}>
          <Stack direction="row" spacing={1}>
            <Button
              onClick={() => {
                filter !== 'month' && setFilter('month');
              }}
              className="shadow"
              sx={
                filter === 'month'
                  ? { color: '#000', backgroundColor: '#fff' }
                  : {
                      color: '#fff',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      ':hover': {
                        color: '#fff',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      },
                    }
              }
            >
              Tháng
            </Button>
            <Button
              onClick={() => {
                filter !== 'year' && setFilter('year');
              }}
              className="shadow"
              sx={
                filter === 'year'
                  ? { color: '#000', backgroundColor: '#fff' }
                  : {
                      color: '#fff',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      ':hover': {
                        color: '#fff',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      },
                    }
              }
            >
              Năm
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <TotalEarning data={data || []} />
        </Grid>
        <Grid item xs={6}>
          <TotalOrder data={data || []} />
        </Grid>
        <Grid item xs={12}>
          <TotalQuantity data={data || []} />
        </Grid>
        <Grid item xs={12}>
          <TotalGrowth data={data || []} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default dynamic(() => Promise.resolve(Statistic), {
  ssr: false,
});
