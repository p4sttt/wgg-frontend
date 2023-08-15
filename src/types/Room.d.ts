export interface Room {
  id: string;
  userId: string | null;
  name: string;
  maxUsersCount: number;
  createdAt: string;
  deleteAt: string | null;
  link: string | null;
}
