import type { NewsComment, CommentInput, CommentStatus } from '../types';

const STORAGE_KEY = 'educar_news_comments';

const SEED_COMMENTS: NewsComment[] = [
  {
    id: 'comment-1',
    newsId: 1,
    authorName: 'Maria Gomez',
    authorEmail: 'maria@email.com',
    content: '¡Qué buenas noticias! Me alegra mucho ver el avance del proyecto educativo.',
    createdAt: '2026-04-15T14:30:00.000Z',
    status: 'approved',
  },
  {
    id: 'comment-2',
    newsId: 1,
    authorName: 'Carlos Lopez',
    authorEmail: 'carlos@email.com',
    content: 'Excelente iniciativa. Ojalá más escuelas adopten este modelo.',
    createdAt: '2026-04-16T09:15:00.000Z',
    status: 'approved',
  },
  {
    id: 'comment-3',
    newsId: 2,
    authorName: 'Ana Martinez',
    authorEmail: 'ana@email.com',
    content: 'Me encantaría que mi hijo participe en el laboratorio de ciencias.',
    createdAt: '2026-04-17T11:00:00.000Z',
    status: 'pending',
  },
];

function readComments(): NewsComment[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_COMMENTS));
    return JSON.parse(JSON.stringify(SEED_COMMENTS)) as NewsComment[];
  }
  try {
    return JSON.parse(raw) as NewsComment[];
  } catch {
    return JSON.parse(JSON.stringify(SEED_COMMENTS)) as NewsComment[];
  }
}

function writeComments(comments: NewsComment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  window.dispatchEvent(new Event('comments-updated'));
}

export function listComments() {
  return readComments().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getCommentsByNewsId(newsId: number, approvedOnly = true) {
  const comments = readComments().filter(c => c.newsId === newsId);
  if (approvedOnly) {
    return comments.filter(c => c.status === 'approved').sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );
  }
  return comments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addComment(newsId: number, input: CommentInput) {
  const comments = readComments();
  const existing = comments.find(c => c.newsId === newsId && c.authorEmail === input.authorEmail);
  if (existing) {
    return { error: 'Ya comentaste en esta noticia con ese correo electrónico. Solo se permite un comentario por persona.' } as const;
  }
  const comment: NewsComment = {
    ...input,
    id: crypto.randomUUID(),
    newsId,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  writeComments([comment, ...comments]);
  return comment;
}

export function updateCommentStatus(id: string, status: CommentStatus) {
  const comments = readComments();
  const index = comments.findIndex(c => c.id === id);
  if (index === -1) return null;
  comments[index].status = status;
  writeComments(comments);
  return comments[index];
}

export function deleteComment(id: string) {
  const filtered = readComments().filter(c => c.id !== id);
  writeComments(filtered);
  return filtered;
}

export function getCommentsCount(newsId: number) {
  return readComments().filter(c => c.newsId === newsId && c.status === 'approved').length;
}

export function listAllCommentsForModeration() {
  return readComments().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
