import httpRequest from '@/services/httpRequest';

export const getNotifications = (page: number, limit = 5) => {
  return httpRequest.get(`/notifications?page=${page}&limit=${limit}`);
};
