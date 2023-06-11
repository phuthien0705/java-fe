import { partStatisticTime } from '@/utils/parseTime';
import httpRequest from '../services/httpRequest';
import { IEachStatisticData } from '@/interfaces/statistic.interface';

export const getStatistic = async ({
  fromDate = partStatisticTime(new Date().toISOString()),
  toDate = partStatisticTime(new Date().toISOString()),
}: {
  fromDate: string;
  toDate: string;
}) => {
  return httpRequest.get<IEachStatisticData[]>(
    `/statistics?fromDate=${fromDate}&toDate=${toDate}`
  );
};
