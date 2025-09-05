
export interface User {
  id: string;
  name: string;
  password?: string; // Used for auth logic, not stored in post data
  avatarUrl: string;
}

export interface Post {
  id:string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author: User;
  date: string;
}