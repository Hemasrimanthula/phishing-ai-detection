
import React from 'react';
import { Shield, Mail, Zap, Lock, Globe, Database, Smartphone, Layout, Cpu, Code } from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Product', path: '/product' },
  { label: 'Documentation', path: '/docs' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const FEATURES = [
  {
    title: 'Neural Inference',
    description: 'On-device machine learning models process linguistic markers and sentiment to detect manipulation attempts.',
    icon: <Cpu className="w-6 h-6 text-cyan-500" />,
  },
  {
    title: 'DNS-SEC Analysis',
    description: 'Deep validation of SPF, DKIM, and DMARC protocols to identify spoofed headers and sender masquerading.',
    icon: <Globe className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Entropy Link Guard',
    description: 'Heuristic analysis of URL entropy and punycode detection to stop credential harvesting via malicious domains.',
    icon: <Code className="w-6 h-6 text-indigo-500" />,
  },
  {
    title: 'Zero-Data Pipeline',
    description: 'Privacy-focused architecture that processes all data locally without persistent storage of sensitive email contents.',
    icon: <Lock className="w-6 h-6 text-purple-500" />,
  },
];

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'Deconstructing the 2024 AI-Phishing Surge',
    excerpt: 'Deep dive into how attackers are using Large Language Models to bypass traditional keyword-based filters.',
    content: 'Forensic analysis shows a 300% increase in perfectly written phishing lures...',
    author: 'Dr. Sarah Chen',
    date: 'Oct 15, 2024',
    category: 'Cyber Forensic',
    image: 'https://picsum.photos/seed/cyber/800/400',
  },
  {
    id: '2',
    title: 'DMARC: The First Line of Defense',
    excerpt: 'Understanding why domain alignment is critical for modern enterprise email security policies.',
    content: 'Full content regarding protocol implementation...',
    author: 'James Wilson',
    date: 'Oct 10, 2024',
    category: 'Protocols',
    image: 'https://picsum.photos/seed/security/800/400',
  }
];
