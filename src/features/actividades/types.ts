export type ActivityCategory = 'deporte' | 'idioma' | 'apoyo' | 'arte' | 'tecnologia';

export interface ActivityInput {
  name: string;
  description: string;
  category: ActivityCategory;
  schedule: string;
  maxStudents: number;
  location: string;
  instructor: string;
  isActive: boolean;
}

export interface Activity extends ActivityInput {
  id: string;
  createdAt: string;
  enrolledStudents: string[];
}

export const categoryLabels: Record<ActivityCategory, string> = {
  deporte: 'Deportes',
  idioma: 'Idiomas',
  apoyo: 'Apoyo Estudiantil',
  arte: 'Arte y Cultura',
  tecnologia: 'Tecnología',
};

export const categoryColors: Record<ActivityCategory, string> = {
  deporte: 'bg-emerald-100 text-emerald-700',
  idioma: 'bg-blue-100 text-blue-700',
  apoyo: 'bg-amber-100 text-amber-700',
  arte: 'bg-purple-100 text-purple-700',
  tecnologia: 'bg-cyan-100 text-cyan-700',
};
