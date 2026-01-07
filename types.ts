export interface Experience {
  id: string;
  role: string;
  company: string;
  isWeb3: boolean;
  duration: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'tech' | 'soft' | 'web3';
}

export interface ResumeData {
  fullName: string;
  bio: string;
  github: string;
  twitter: string;
  website: string;
  experience: Experience[];
  skills: Skill[];
}

export const INITIAL_DATA: ResumeData = {
  fullName: '',
  bio: '',
  github: '',
  twitter: '',
  website: '',
  experience: [],
  skills: [],
};