import type {
  PublicOpinion,
  PublicOpinionInput,
  PublicOpinionStatus,
} from '../types';

const OPINIONS_STORAGE_KEY = 'educar_public_opinions';

const SEEDED_OPINIONS: PublicOpinion[] = [
  {
    id: 'seed-opinion-1',
    displayName: 'Maria Gomez',
    relation: 'familia',
    message:
      'Valoramos mucho el acompanamiento cercano y la forma en que la escuela comunica cada etapa del ciclo.',
    createdAt: '2026-04-11T10:30:00.000Z',
    status: 'approved',
    source: 'seed',
  },
  {
    id: 'seed-opinion-2',
    displayName: 'Luciano R.',
    relation: 'egresado',
    message:
      'Fue un espacio exigente y humano a la vez. Me dejo herramientas reales para seguir estudiando.',
    createdAt: '2026-04-18T14:45:00.000Z',
    status: 'approved',
    source: 'seed',
  },
];

function readOpinions() {
  const raw = localStorage.getItem(OPINIONS_STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(OPINIONS_STORAGE_KEY, JSON.stringify(SEEDED_OPINIONS));
    return SEEDED_OPINIONS;
  }

  try {
    return JSON.parse(raw) as PublicOpinion[];
  } catch {
    return SEEDED_OPINIONS;
  }
}

function writeOpinions(opinions: PublicOpinion[]) {
  localStorage.setItem(OPINIONS_STORAGE_KEY, JSON.stringify(opinions));
}

export function listOpinions() {
  return readOpinions().sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
}

export function listApprovedOpinions(limit?: number) {
  const approved = listOpinions().filter((item) => item.status === 'approved');
  return typeof limit === 'number' ? approved.slice(0, limit) : approved;
}

export function createPublicOpinion(input: PublicOpinionInput) {
  const opinion: PublicOpinion = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    source: 'public-form',
  };

  writeOpinions([opinion, ...readOpinions()]);
  return opinion;
}

export function updateOpinionStatus(id: string, status: PublicOpinionStatus) {
  const updated = readOpinions().map((item) =>
    item.id === id ? { ...item, status } : item,
  );

  writeOpinions(updated);
  return updated.find((item) => item.id === id) ?? null;
}

export function deletePublicOpinion(id: string) {
  const updated = readOpinions().filter((item) => item.id !== id);
  writeOpinions(updated);
  return updated;
}
