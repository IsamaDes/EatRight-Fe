// services/subscriptionService.ts
import axiosInstance from '../utils/AxiosInstance';

export interface SubscriptionQueryParams {
  organization_id?: string;
  search?: string;
  status?: string;
  subscriber_id?: string;
  limit?: number;
  page?: number;
}

type BillingInterval = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';


export interface CreateSubscriptionPayload {
  subscriber_id: string | null;
  organization_id: string | null;
  plan_name: string;
  amount: number;
  billing_interval: BillingInterval;
  currency: string;
  billing_cycle_count: number;
  trial_start_date?: string;
  trial_end_date?: string;
  metadata?: {
    features?: string[];
  };
}


interface SubscriptionPaymentPayload {
  gateway: string;
  redirect_url: string;
  currency: string;
  metadata: {
    auto_renew: boolean;
  };
  reference: string;
}

export const initializeSubscriptionPayment = async (
  subscriptionId: string,
  payload: SubscriptionPaymentPayload
) => {
  try {
    const response = await axiosInstance.post(
      `/subscriptions/${subscriptionId}/payment`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error initializing subscription payment:', error);
    throw error;
  }
};

export const getSubscriptions = async (params: SubscriptionQueryParams) => {
  const response = await axiosInstance.get('/subscriptions', {
    params,
  });
  return response.data;
};

export const createSubscription = async (
  payload: CreateSubscriptionPayload
) => {
  try {
    const response = await axiosInstance.post('/subscriptions', payload);
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
