export type OpinionRelation = 'familia' | 'alumno' | 'egresado' | 'comunidad';

export type PublicOpinionStatus = 'pending' | 'approved' | 'rejected';

export interface PublicOpinionInput {
  displayName: string;
  relation: OpinionRelation;
  message: string;
}

export interface PublicOpinion extends PublicOpinionInput {
  id: string;
  createdAt: string;
  status: PublicOpinionStatus;
  source: 'public-form' | 'seed';
}
