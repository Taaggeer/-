export type TabType = 'dashboard' | 'articles' | 'users' | 'analytics';

export type ArticleStatus = 'published' | 'draft' | 'archived';

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  status: ArticleStatus;
  views: number;
  likes: number;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
}

export type UserRole = 'admin' | 'editor' | 'author' | 'subscriber';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  articlesCount: number;
  joinedAt: string;
  lastActive: string;
  bio?: string;
}

export interface StatMetric {
  id: string;
  title: string;
  value: string | number;
  rawNumber: number;
  change: string;
  isPositive: boolean;
  period: string;
  iconName: 'file-text' | 'users' | 'eye' | 'trending-up' | 'message-square' | 'clock';
  color: string;
  sparkline: number[];
}

export interface ActivityLog {
  id: string;
  user: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'publish' | 'user';
}

export interface CategoryStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
  icon: string;
}
