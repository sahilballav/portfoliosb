
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
  imageUrl?: string; // Fallback image / Poster
  videoUrl?: string; // New field for the video
  location?: string; // New field for location tag
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credentialUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // lucide icon name
}

export interface NavItem {
  label: string;
  href: string;
}

export enum ChatSender {
  USER = 'user',
  BOT = 'bot'
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: Date;
  isError?: boolean;
}
