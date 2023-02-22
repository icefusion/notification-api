export interface ICreateMessageDTO {
  from: string;
  to: string;
  subject: string;
  message: string;
  channel: string;
  inscriptions: string[];
  user_id: string;
  user_name: string;
  created_at: Date;
}