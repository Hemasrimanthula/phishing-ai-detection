
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface SiteSettings {
  primaryColor: string;
  theme: 'light' | 'dark';
  siteName: string;
  metaDescription: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface Heuristics {
  linguisticManipulation: number;
  linkEntropy: number;
  domainMasking: number;
}

export type ScanType = 'EMAIL' | 'URL' | 'FILE' | 'API';

export interface ScanResult {
  id: string;
  date: string;
  type: ScanType;
  verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  riskScore: number;
  explanation: string;
  redFlags: string[];
  heuristics?: Heuristics;
}

export interface NavItem {
  label: string;
  path: string;
}

export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info'
}
