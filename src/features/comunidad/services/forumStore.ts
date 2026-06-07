export interface ForumReply {
  id: number;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  content: string;
  score: number;
  parentId: number | null; // For nested replies
  userVoted?: 'up' | 'down';
}

export interface Discussion {
  id: number;
  category: 'Académico' | 'Vida Escolar' | 'Grupos de Estudio' | 'Intercambio' | 'Deportes';
  authorName: string;
  authorHandle: string;
  authorRole: string;
  authorAvatar?: string;
  title: string;
  date: string;
  score: number;
  lead: string;
  content: string[];
  repliesCount: number;
  replies: ForumReply[];
  userVoted?: 'up' | 'down';
  image?: string;
}

export interface StudentProfile {
  name: string;
  role: string;
  avatar: string;
  reputation: number;
  postsCount: number;
  badgesCount: number;
  badges: string[];
}

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Mateo Silvetti',
  role: 'Ingeniería en Sistemas de Información • 4º Año',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200', // Premium female/male portrait from mock
  reputation: 128,
  postsCount: 42,
  badgesCount: 15,
  badges: ['Contributor', 'Mentor']
};

const DEFAULT_DISCUSSIONS: Discussion[] = [
  {
    id: 1,
    category: 'Académico',
    authorName: 'Dr. Julian Casale',
    authorHandle: '@julian_med',
    authorRole: 'Profesor Adjunto • Facultad de Medicina',
    authorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150',
    title: 'Metodología de Estudio en Medicina: ¿Cómo abordar la anatomía clínica?',
    date: '14 de Mayo, 2024',
    score: 124,
    lead: 'Estimados alumnos, ante las consultas recurrentes sobre el volumen de material para el segundo parcial, he decidido abrir este hilo para discutir estrategias de síntesis y retención.',
    content: [
      'Estimados alumnos, ante las consultas recurrentes sobre el volumen de material para el segundo parcial, he decidido abrir este hilo para discutir estrategias de síntesis y retención. La anatomía no es solo memoria visual; es comprensión espacial y funcional.',
      'Mi recomendación principal es la técnica de active recall combinada con diagramas de flujo funcional. No basta con mirar el atlas de Netter durante horas; es necesario cerrar el libro y reconstruir los trayectos nerviosos desde cero sobre una hoja en blanco.',
      '¿Qué métodos están utilizando ustedes para integrar la histología con la macroscopía? Los leo.'
    ],
    repliesCount: 3,
    replies: [
      {
        id: 101,
        authorName: 'Marcos Aguirre',
        authorRole: 'Estudiante 3er año',
        date: 'Hace 2 horas',
        content: 'Totalmente de acuerdo, Dr. Casale. A mí lo que me funcionó mucho fue el uso de Anki para las inserciones musculares. Pero para la irrigación, nada le gana a dibujar los esquemas de las arterias en un pizarrón.',
        score: 18,
        parentId: null
      },
      {
        id: 102,
        authorName: 'Lucas Benitez',
        authorRole: 'Estudiante 1er año',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
        date: 'Hace 45 minutos',
        content: '¿Marcos, podrías compartir tu mazo de Anki? Me está costando horrores el plexo braquial y creo que ese método me vendría bárbaro.',
        score: 4,
        parentId: 101
      },
      {
        id: 103,
        authorName: 'Sofia Valenzuela',
        authorRole: 'Ayudante de Cátedra',
        date: 'Hace 4 horas',
        content: 'Chicos, recuerden que mañana a las 18hs tenemos el repaso por Meet. Vamos a focalizar justamente en las dudas que están planteando sobre integración clínica.',
        score: 32,
        parentId: null
      }
    ]
  },
  {
    id: 2,
    category: 'Vida Escolar',
    authorName: 'Lucía Morales',
    authorHandle: '@lucia_m',
    authorRole: 'Estudiante 2º año',
    authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150',
    title: '¡Nueva cafetería abierta en el pabellón B!',
    date: 'Hace 5 horas',
    score: 89,
    lead: '¿Alguien ya probó el nuevo espresso bar cerca del auditorio? Escuché que tienen descuentos para estudiantes y la zona de estudio allí es bastante tranquila.',
    content: [
      '¿Alguien ya probó el nuevo espresso bar cerca del auditorio? Escuché que tienen descuentos para estudiantes y la zona de estudio allí es bastante tranquila para repasar entre materias.',
      '¿Qué les parecieron los precios y la calidad del café?'
    ],
    repliesCount: 15,
    replies: []
  },
  {
    id: 3,
    category: 'Grupos de Estudio',
    authorName: 'Mateo Silvetti',
    authorHandle: '@eng_mateo',
    authorRole: 'Ingeniería en Sistemas • 4º Año',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
    title: 'Buscando compañeros para el proyecto final de Arquitectura de Software',
    date: 'Hace 1 día',
    score: 56,
    lead: 'Necesitamos 2 personas más para el proyecto final. Preferencia por alguien cómodo con Python y optimización de algoritmos.',
    content: [
      'Necesitamos 2 personas más para el proyecto final. Preferencia por alguien cómodo con Python y optimización de algoritmos. Nos reunimos este jueves a las 14:00hs en la biblioteca o por Discord.',
      '¡Cualquier interesado me escribe por privado o responde acá!'
    ],
    repliesCount: 8,
    replies: []
  }
];

const LOCAL_STORAGE_FORUM_KEY = 'educar_forum_discussions';
const LOCAL_STORAGE_PROFILE_KEY = 'educar_forum_profile';

export const forumStore = {
  getProfile(): StudentProfile {
    const data = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  updateProfile(profile: Partial<StudentProfile>): StudentProfile {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(updated));
    return updated;
  },

  getDiscussions(): Discussion[] {
    const data = localStorage.getItem(LOCAL_STORAGE_FORUM_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_FORUM_KEY, JSON.stringify(DEFAULT_DISCUSSIONS));
      return DEFAULT_DISCUSSIONS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_DISCUSSIONS;
    }
  },

  getDiscussionById(id: number): Discussion | undefined {
    return this.getDiscussions().find(d => d.id === id);
  },

  addDiscussion(discussion: Omit<Discussion, 'id' | 'score' | 'repliesCount' | 'replies'>): Discussion {
    const discussions = this.getDiscussions();
    const newId = discussions.length > 0 ? Math.max(...discussions.map(d => d.id)) + 1 : 1;
    const newDiscussion: Discussion = {
      ...discussion,
      id: newId,
      score: 1,
      repliesCount: 0,
      replies: []
    };
    discussions.unshift(newDiscussion);
    localStorage.setItem(LOCAL_STORAGE_FORUM_KEY, JSON.stringify(discussions));
    
    // Update profile posts count
    const profile = this.getProfile();
    this.updateProfile({ postsCount: profile.postsCount + 1, reputation: profile.reputation + 10 });
    
    return newDiscussion;
  },

  addReply(discussionId: number, content: string, parentId: number | null = null): ForumReply | undefined {
    const discussions = this.getDiscussions();
    const discIndex = discussions.findIndex(d => d.id === discussionId);
    if (discIndex === -1) return undefined;

    const disc = discussions[discIndex];
    const profile = this.getProfile();

    const newReplyId = disc.replies.length > 0 ? Math.max(...disc.replies.map(r => r.id)) + 1 : 101;
    const newReply: ForumReply = {
      id: newReplyId,
      authorName: profile.name,
      authorRole: 'Estudiante',
      authorAvatar: profile.avatar,
      date: 'Hace unos instantes',
      content,
      score: 1,
      parentId
    };

    disc.replies.push(newReply);
    disc.repliesCount = disc.replies.length;
    discussions[discIndex] = disc;
    localStorage.setItem(LOCAL_STORAGE_FORUM_KEY, JSON.stringify(discussions));

    // Update profile reputation
    this.updateProfile({ reputation: profile.reputation + 5 });

    return newReply;
  },

  voteDiscussion(id: number, direction: 'up' | 'down'): Discussion | undefined {
    const discussions = this.getDiscussions();
    const index = discussions.findIndex(d => d.id === id);
    if (index === -1) return undefined;

    const disc = discussions[index];
    const currentVote = disc.userVoted;

    if (currentVote === direction) {
      // Undo vote
      disc.score += direction === 'up' ? -1 : 1;
      disc.userVoted = undefined;
    } else {
      // Apply vote or switch vote direction
      const diff = currentVote ? (direction === 'up' ? 2 : -2) : (direction === 'up' ? 1 : -1);
      disc.score += diff;
      disc.userVoted = direction;
    }

    discussions[index] = disc;
    localStorage.setItem(LOCAL_STORAGE_FORUM_KEY, JSON.stringify(discussions));
    return disc;
  },

  voteReply(discussionId: number, replyId: number, direction: 'up' | 'down'): ForumReply | undefined {
    const discussions = this.getDiscussions();
    const discIndex = discussions.findIndex(d => d.id === discussionId);
    if (discIndex === -1) return undefined;

    const disc = discussions[discIndex];
    const replyIndex = disc.replies.findIndex(r => r.id === replyId);
    if (replyIndex === -1) return undefined;

    const reply = disc.replies[replyIndex];
    const currentVote = reply.userVoted;

    if (currentVote === direction) {
      reply.score += direction === 'up' ? -1 : 1;
      reply.userVoted = undefined;
    } else {
      const diff = currentVote ? (direction === 'up' ? 2 : -2) : (direction === 'up' ? 1 : -1);
      reply.score += diff;
      reply.userVoted = direction;
    }

    disc.replies[replyIndex] = reply;
    discussions[discIndex] = disc;
    localStorage.setItem(LOCAL_STORAGE_FORUM_KEY, JSON.stringify(discussions));
    return reply;
  }
};
