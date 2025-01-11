export type Message = {
  id: string;
  user_id: number;
  room_id: number;
  content: string;
  created_at: string;
};

export type User = {
  id: number;
  name: string;
  email: string | null;
};

export type Room = {
  host_id: number;
  id: number;
  name: string;
  settings: {};
};
