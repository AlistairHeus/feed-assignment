export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  createdAt: number;
  avatar?: string;
  emoji?: string;
  userId?: string;
  isDemoPost?: boolean;
}
