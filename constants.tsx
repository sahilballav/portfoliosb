
import React from 'react';
import { Project, Experience, SocialLink, NavItem, Certification } from './types';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_DATA = {
  name: "Sahil Ballav",
  role: "AI/ML Engineer & Flutter Dev",
  tagline: "TURNING DATA INTO DECISIONS WITH INTELLIGENT ALGORITHMS AND SEAMLESS MOBILE APPS.",
  description: "I'm a B.Tech student and developer specializing in building intelligent systems and cross-platform mobile experiences.",
  location: "India",
  // ----------------------------------------------------------------------------------
  // TO CHANGE ABOUT ME IMAGE:
  // 1. Create a folder named 'images' inside the 'public' folder.
  // 2. Add your photo (e.g. 'me.jpg') to 'public/images/'.
  // 3. Change the line below to: avatarUrl: '/images/me.jpg',
  // ----------------------------------------------------------------------------------
  avatarUrl: "/images/personal.jpg"
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Book Recommendation Engine',
    description: 'A robust recommendation system utilizing Collaborative Filtering algorithms to suggest books based on user preferences and reading history.',
    techStack: ['Python', 'Scikit-learn', 'ML'],
    repoUrl: 'https://github.com',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'Image Classification CNN',
    description: 'A deep learning model designed for computer vision tasks, capable of accurately classifying images using Convolutional Neural Networks.',
    techStack: ['TensorFlow', 'Deep Learning', 'CV'],
    repoUrl: 'https://github.com',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: '3',
    title: 'Real Estate Analysis',
    description: 'Predictive analysis tool for real estate markets using regression models to forecast property prices based on historical data.',
    techStack: ['Pandas', 'Python', 'Regression'],
    repoUrl: 'https://github.com',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop',
    featured: true
  },
  {
    id: '4',
    title: 'Cross-Platform App',
    description: 'A seamless mobile application experience built with Flutter, ensuring high performance and native feel on both iOS and Android.',
    techStack: ['Flutter', 'Dart', 'Firebase'],
    repoUrl: 'https://github.com',
    liveUrl: '#',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
    featured: true
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: 'Machine Learning Specialization',
    issuer: 'Coursera / Stanford Online',
    date: '2023',
    credentialUrl: '#',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg'
  },
  {
    id: 'c2',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google Developers',
    date: '2023',
    credentialUrl: '#',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg'
  },
  {
    id: 'c3',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2022',
    credentialUrl: '#',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Deeplearning.ai_logo.png/600px-Deeplearning.ai_logo.png'
  },
  {
    id: 'c4',
    title: 'Flutter Development Bootcamp',
    issuer: 'Udemy',
    date: '2022',
    credentialUrl: '#',
    imageUrl: 'https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    company: 'KIIT University',
    role: 'B.Tech Student (IT)',
    period: '2023 — 2027',
    description: [
      'Pursuing a Bachelor of Technology in Information Technology.',
      'Specializing in Artificial Intelligence and Mobile Application Development.',
      'Bridging the gap between complex algorithms and user-centric design.'
    ],
    skills: ['Data Structures', 'Algorithms', 'System Design'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
    // ----------------------------------------------------------------------------------
    // NOTE: Web browsers cannot read local file paths like "C:/Users/...".
    // Instead, the file must be in the "public" folder, and you refer to it with a relative path.
    // 
    // Ensure your video file "campus.mp4" is inside: [Your Project Folder]/public/videos/
    // ----------------------------------------------------------------------------------
    videoUrl: '/videos/campus.mp4', 
    location: 'Bhubaneswar, India'
  },
  {
    id: 'exp2',
    company: 'Independent',
    role: 'Full Stack Developer',
    period: '2021 — Present',
    description: [
      'Designing and developing cross-platform mobile applications using Flutter and Dart.',
      'Implementing machine learning models for real-world problem solving.',
      'Exploring new technologies in NLP and Computer Vision.'
    ],
    skills: ['Flutter', 'Dart', 'Firebase', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '/videos/coding.mp4', 
    location: 'Remote'
  },
  {
    id: 'exp3',
    company: 'Certifications',
    role: 'Continuous Learner',
    period: 'Ongoing',
    description: [
      'Machine Learning Specialization (Coursera)',
      'Data Science Projects (Kaggle)',
      'Deep Learning & Neural Networks (Udemy)'
    ],
    skills: ['TensorFlow', 'Keras', 'Scikit-learn', 'Pandas'],
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4', 
    location: 'Online'
  }
];

export const SOCIALS: SocialLink[] = [
  { name: 'WhatsApp', url: 'https://wa.me/911234567890', icon: 'whatsapp' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { name: 'Email', url: 'mailto:sahilballav@gmail.com', icon: 'mail' },
];
