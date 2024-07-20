export interface Chat {
  id: string;
  message: string;
  sender_id: string;
  receiver: string;
  timestamp: number;
  last_message: string;
}
