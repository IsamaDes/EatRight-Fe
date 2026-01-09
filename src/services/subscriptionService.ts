import axiosInstance from '../utils/AxiosInstance';

export interface SubscriptionQueryParams {
  organization_id?: string;
  search?: string;
  status?: string;
  subscriberId?: string;
  limit?: number;
  page?: number;
}

type BillingInterval = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';


export interface CreateSubscriptionPayload {
  subscriberId?: string;
  planName: string;
  amount: number;
  billingInterval: BillingInterval;
  currency: string;
  billingCycleCount: number;
  metadata?: {
    features?: string[];
  };
}


export interface InitializeSubscriptionPayload {
  gateway: string;
  reference?: string; 
  redirectUrl: string; 
  metadata?: {
    autoRenew?: boolean; 
  };
}



export const getSubscriptions = async (params: SubscriptionQueryParams) => {
  const response = await axiosInstance.get('/subscriptions', {params});
  return response.data;
};

export const createSubscription = async (payload: CreateSubscriptionPayload) => {
  try {
    const response = await axiosInstance.post('/subscriptions/create-subscription', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const cancelSubscription = async (id: string) => {
  return axiosInstance.post(`/subscriptions/${id}/cancel`);
};

export const suspendSubscription = async (id: string) => {
  return axiosInstance.post(`/subscriptions/${id}/suspend`);
};

export const renewSubscription = async (id: string) => {
  return axiosInstance.post(`/subscriptions/${id}/renew`);
};
