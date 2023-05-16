import moment from 'moment';
import 'moment/locale/vi';

export function parseShortTime(time: string) {
  moment.locale('vi');
  return moment(new Date(time)).format('DD/MM/YYYY');
}

export function partStatisticTime(time: string) {
  moment.locale('vi');
  return moment(new Date(time)).format('YYYY-MM-DD');
}
