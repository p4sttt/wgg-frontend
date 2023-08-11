export interface Room {
  id: string;
  userId?: string;
  name: string;
  maxUsersCount: number;
  createdAt: string;
  deleteAt?: string;
  link?: string;
}
