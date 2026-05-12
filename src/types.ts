/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CandidateStatus = 'sourced' | 'contacted' | 'screening' | 'interview' | 'client_interview' | 'offer' | 'placed' | 'rejected';

export interface Candidate {
  id: string;
  name: string;
  role: string;
  company?: string;
  experience: number; // in years
  location: string;
  skills: string[];
  salaryExpectation: string;
  status: CandidateStatus;
  aiScore: number; // 0-100
  aiSummary: string;
  lastContacted: string;
  email: string;
  linkedinUrl?: string;
  ownerId: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'contract' | 'remote';
  status: 'open' | 'closed' | 'on-hold';
  postedAt: string;
  pipelineCount: number;
  ownerId: string;
}

export interface Recruiter {
  id: string;
  name: string;
  role: string;
  avatar: string;
  activeJobs: number;
  placementsThisMonth: number;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  type: 'follow-up' | 'interview' | 'screening' | 'other';
  candidateId?: string;
}
