export interface IEachStatisticData {
  monthYear: string;
  totalOrder: number;
  totalRevenue: number;
  totalSold: number;
}

export interface IEachStatisticWithProfitData extends IEachStatisticData {
  profit: number;
}
