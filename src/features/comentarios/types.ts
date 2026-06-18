export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface CommentInput {
  authorName: string;
  authorEmail: string;
  content: string;
}

export interface NewsComment extends CommentInput {
  id: string;
  newsId: number;
  createdAt: string;
  status: CommentStatus;
}
