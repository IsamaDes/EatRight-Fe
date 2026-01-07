// services/chatService.ts
import axiosInstance from '../utils/AxiosInstance';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  messageType: string;
  created_at?: string;
}

export interface SendMessagePayload {
  receiverId: string;
  message: string;
  messageType: string;
}

export const getChatMessages = async (
  senderId: string
): Promise<Message[]> => {
  try {
    const response = await axiosInstance.get(`chats/get-messages/${senderId}`
     
    );
    return response.data.data;
  } catch (error: any) {
    console.error(
      'getChatMessages error:',
      error.response?.data || error.message
    );
    return [];
  }
};


