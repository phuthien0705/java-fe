export interface IEachNotificationData {
  id: number;
  userId: number;
  orderId: number;
  title: string;
  content: string;
  type: string;
  createdDate: string | null;
  read: boolean;
}
