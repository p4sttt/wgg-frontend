export interface Room {
  id: string;
  userId?: string;
  name: string;
  maxUsersCount: number;
  createdAt: Date;
  deleteAt?: Date;
  link?: string;
}
