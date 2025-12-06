// services/chatService.ts
import axiosInstance from '../utils/AxiosInstance';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  message_type: string;
  created_at?: string;
}

interface SendMessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
  messageType: 'text' | 'image' | 'file';
}

//  Correct order of query params: sender_id, receiver_id
export const getChatMessages = async (
  senderId: string,
  receiverId: string
): Promise<Message[]> => {
  try {
    const response = await axiosInstance.get(`/chat-messages`, {
      params: {
        sender_id: senderId,
        receiver_id: receiverId,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error(
      'getChatMessages error:',
      error.response?.data || error.message
    );
    return [];
  }
};

export const sendMessage = async (
  payload: SendMessagePayload
): Promise<Message> => {
  try {
    const response = await axiosInstance.post('/chat-messages', {
      sender_id: payload.senderId,
      receiver_id: payload.receiverId,
      message: payload.message,
      message_type: payload.messageType,
    });

    if (response.data?.success && response.data.data) {
      return response.data.data as Message;
    } else {
      throw new Error('Unexpected response format from sendMessage');
    }
  } catch (error: any) {
    console.error('sendMessage error:', error.response?.data || error.message);
    throw error;
  }
};
