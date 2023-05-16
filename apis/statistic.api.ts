import { partStatisticTime } from '@/utils/parseTime';
import httpRequest from '../services/httpRequest';

export const getStatistic = async ({
  startDate = partStatisticTime(new Date().toISOString()),
  endDate = partStatisticTime(new Date().toISOString()),
}: {
  startDate: string;
  endDate: string;
}) => {
  return httpRequest.get(`/admin/statistics?date=${startDate},${endDate}`);
};
