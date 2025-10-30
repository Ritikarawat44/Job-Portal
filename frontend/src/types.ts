export interface Job {
  id?: number;
  title: string;
  description: string;
  location: string;
  company: string;
  postedByEmail: string;
}

export interface User {
  id?: number;
  email: string;
  name?: string;
  role: 'JOB_SEEKER' | 'RECRUITER';
}

export interface Application {
  id?: number;
  jobId: number;
  userId: number;
  resumeUrl?: string;
  coverLetter?: string;
}