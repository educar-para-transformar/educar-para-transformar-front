export type EnrollmentStatus =
  | 'pending'
  | 'reviewed'
  | 'approved_for_registration'
  | 'pending_admin_creation'
  | 'account_created'
  | 'archived';

export interface EnrollmentRequestInput {
  studentFirstName: string;
  studentLastName: string;
  studentDni: string;
  birthDate: string;
  educationalLevel: string;
  schoolYear: string;
  turn: string;
  responsibleFullName: string;
  responsibleDni: string;
  responsibleRelation: string;
  phone: string;
  email: string;
  notes: string;
}

export interface EnrollmentRequest extends EnrollmentRequestInput {
  id: string;
  createdAt: string;
  status: EnrollmentStatus;
  source: 'public-form';
}
