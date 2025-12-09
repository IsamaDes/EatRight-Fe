import axiosInstance from '../utils/AxiosInstance';

interface PaymentInitPayload {
  payer_id: string;
  organization_id: string;
  amount: number;
  payment_type: string;
  gateway: string;
  entity_id: string;
  currency: string;
  description: string;
  is_recurring: boolean;
  next_payment_date?: string;
  metadata: Record<string, any>;
  reference: string;
  redirect_url: string;
}

export interface PaymentConfigPayload {
  organization_id: string;
  gateway: 'paystack';
  config: {
    public_key: string;
    secret_key: string;
  };
  is_active: boolean;
  is_test_mode: boolean;
}

export interface PaymentGatewayConfig {
  id: string;
  organization_id: string;
  gateway: string;
  is_active: boolean;
  is_test_mode: boolean;
  config: {
    public_key: string;
    secret_key: string;
  };
  created_at: string;
  updated_at: string;
}

export const initializePayment = async (orderId: string, payload: any) => {
  try {
    const response = await axiosInstance.post(
      `/orders/${orderId}/payment`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};

export const createPaymentGatewayConfig = async (
  payload: PaymentConfigPayload
) => {
  try {
    const response = await axiosInstance.post('/payments/config', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to create payment gateway config:', error);
    throw error;
  }
};

export const getPaymentConfigs = async (organizationId: string) => {
  try {
    const response = await axiosInstance.get(
      `/payments/config/${organizationId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching payment configs:', error);
    return null;
  }
};

export const getPaymentGatewayConfigs = async (organizationId: string) => {
  try {
    const response = await axiosInstance.get(
      `/payments/config/${organizationId}`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error('Error fetching payment gateway configs:', error);
    return [];
  }
};
