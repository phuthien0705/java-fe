import { IEachStatisticWithProfitData } from '../statistic.interface';
interface IStaisticProps {
  data: IEachStatisticWithProfitData[];
  isLoading: boolean;
}
export type ITotalGrowth = IStaisticProps;
export type ITotalQuantity = IStaisticProps;
export type ITotalEarning = IStaisticProps;
export type ITotalSold = IStaisticProps;
export type ITotalOrder = IStaisticProps;
