import type { Activity, ActivityInput } from '../types';

const STORAGE_KEY = 'educar_extracurricular_activities';

const SEED_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    name: 'Fútbol',
    description: 'Entrenamiento y competencia intercolegial de fútbol para todos los niveles.',
    category: 'deporte',
    schedule: 'Lunes y Miércoles 16:00-18:00',
    maxStudents: 30,
    location: 'Campo de Deportes',
    instructor: 'Prof. Lucas Almada',
    isActive: true,
    createdAt: '2026-03-01T10:00:00.000Z',
    enrolledStudents: ['46463269'],
  },
  {
    id: 'act-2',
    name: 'Inglés Avanzado',
    description: 'Taller de conversación y gramática inglesa para nivel secundario.',
    category: 'idioma',
    schedule: 'Martes y Jueves 14:00-16:00',
    maxStudents: 20,
    location: 'Aula 203',
    instructor: 'Prof. Laura Benitez',
    isActive: true,
    createdAt: '2026-03-05T10:00:00.000Z',
    enrolledStudents: [],
  },
  {
    id: 'act-3',
    name: 'Apoyo en Matemáticas',
    description: 'Refuerzo escolar personalizado para alumnos que necesitan consolidar contenidos.',
    category: 'apoyo',
    schedule: 'Lunes a Viernes 17:00-18:30',
    maxStudents: 15,
    location: 'Aula 105',
    instructor: 'Lic. Mariana Costa',
    isActive: true,
    createdAt: '2026-03-10T10:00:00.000Z',
    enrolledStudents: [],
  },
];

function readActivities() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ACTIVITIES));
    return SEED_ACTIVITIES;
  }
  try {
    return JSON.parse(raw) as Activity[];
  } catch {
    return SEED_ACTIVITIES;
  }
}

function writeActivities(activities: Activity[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  window.dispatchEvent(new Event('activities-updated'));
}

export function listActivities() {
  return readActivities().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getActivityById(id: string) {
  return readActivities().find(a => a.id === id) ?? null;
}

export function createActivity(input: ActivityInput) {
  const activities = readActivities();
  const activity: Activity = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    enrolledStudents: [],
  };
  writeActivities([activity, ...activities]);
  return activity;
}

export function updateActivity(id: string, input: Partial<ActivityInput>) {
  const activities = readActivities();
  const index = activities.findIndex(a => a.id === id);
  if (index === -1) return null;
  activities[index] = { ...activities[index], ...input };
  writeActivities(activities);
  return activities[index];
}

export function deleteActivity(id: string) {
  const filtered = readActivities().filter(a => a.id !== id);
  writeActivities(filtered);
  return filtered;
}

export function enrollStudentInActivity(activityId: string, studentDni: string) {
  const activities = readActivities();
  const index = activities.findIndex(a => a.id === activityId);
  if (index === -1) return null;
  const activity = activities[index];
  if (activity.enrolledStudents.includes(studentDni)) return activity;
  if (activity.enrolledStudents.length >= activity.maxStudents) return null;
  activity.enrolledStudents.push(studentDni);
  activities[index] = activity;
  writeActivities(activities);
  return activity;
}

export function unenrollStudentFromActivity(activityId: string, studentDni: string) {
  const activities = readActivities();
  const index = activities.findIndex(a => a.id === activityId);
  if (index === -1) return null;
  activities[index].enrolledStudents = activities[index].enrolledStudents.filter(
    d => d !== studentDni
  );
  writeActivities(activities);
  return activities[index];
}

export function getStudentActivities(studentDni: string) {
  return readActivities().filter(a => a.enrolledStudents.includes(studentDni));
}
