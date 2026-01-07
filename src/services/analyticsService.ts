import  axiosInstance  from '../utils/AxiosInstance';
import { ClientAnalyticsResponse } from '../utils/clientAnalytics.contract';

export const getClientAnalytics = async (
  clientId: string,
  range: '7d' | '30d',
  include: Array<'weight' | 'mood' | 'insights'> = []
): Promise<ClientAnalyticsResponse> => {
  const res = await axiosInstance.get("/analytics/client", {
    params: { range, include: include.join(',') },
  });

  if (!res.data) throw new Error('No analytics data found');

  return res.data as ClientAnalyticsResponse;
};
