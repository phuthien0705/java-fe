import httpRequest from '@/services/httpRequest';
import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachNotificationData } from '@/interfaces/notification.interfacet';

export const getNotifications = (page: number, limit = 5) => {
  return httpRequest.get<IPaginationResponse<IEachNotificationData>>(
    `/notifications?page=${page}&limit=${limit}`
  );
};
