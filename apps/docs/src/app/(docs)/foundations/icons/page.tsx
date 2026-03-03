'use client';

import React, { useState } from 'react';
import {
  // General
  Search, Settings, Home, User, Users, Plus, Minus, X, Check, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ExternalLink, Link, Copy, Clipboard,
  // Media
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Mic, MicOff, Camera, Image as ImageIcon, Film, Music,
  // Communication
  Mail, MessageSquare, Phone, Send, Bell, BellOff, AtSign, Share2,
  // Files
  File, FileText, Folder, FolderOpen, Download, Upload, Save, Trash2, Archive,
  // UI
  Menu, MoreHorizontal, MoreVertical, Filter, Grid, List, Maximize2, Minimize2, Eye, EyeOff, RefreshCw,
  // Status
  AlertCircle, AlertTriangle, Info, CheckCircle, XCircle, HelpCircle, Clock, Loader2,
  // Social
  Heart, Star, ThumbsUp, ThumbsDown, Bookmark, Flag, Award,
  // Security
  Lock, Unlock, Shield, Key,
  // Weather & Nature
  Sun, Moon, Cloud, CloudRain, Zap,
  // Editing
  Edit3, Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  // Navigation
  Map, MapPin, Navigation, Compass, Globe,
  // Commerce
  ShoppingCart, CreditCard, DollarSign, Tag, Package,
} from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText } from '@/components/docs/DocPage';

interface IconEntry {
  name: string;
  icon: React.ReactNode;
}

const iconGroups: { title: string; key: string; icons: IconEntry[] }[] = [
  {
    title: 'General',
    key: 'general',
    icons: [
      { name: 'Search', icon: <Search /> }, { name: 'Settings', icon: <Settings /> }, { name: 'Home', icon: <Home /> },
      { name: 'User', icon: <User /> }, { name: 'Users', icon: <Users /> }, { name: 'Plus', icon: <Plus /> },
      { name: 'Minus', icon: <Minus /> }, { name: 'X', icon: <X /> }, { name: 'Check', icon: <Check /> },
      { name: 'ChevronDown', icon: <ChevronDown /> }, { name: 'ChevronUp', icon: <ChevronUp /> },
      { name: 'ChevronLeft', icon: <ChevronLeft /> }, { name: 'ChevronRight', icon: <ChevronRight /> },
      { name: 'ArrowLeft', icon: <ArrowLeft /> }, { name: 'ArrowRight', icon: <ArrowRight /> },
      { name: 'ArrowUp', icon: <ArrowUp /> }, { name: 'ArrowDown', icon: <ArrowDown /> },
      { name: 'ExternalLink', icon: <ExternalLink /> }, { name: 'Link', icon: <Link /> },
      { name: 'Copy', icon: <Copy /> }, { name: 'Clipboard', icon: <Clipboard /> },
    ],
  },
  {
    title: 'Media',
    key: 'media',
    icons: [
      { name: 'Play', icon: <Play /> }, { name: 'Pause', icon: <Pause /> },
      { name: 'SkipBack', icon: <SkipBack /> }, { name: 'SkipForward', icon: <SkipForward /> },
      { name: 'Volume2', icon: <Volume2 /> }, { name: 'VolumeX', icon: <VolumeX /> },
      { name: 'Mic', icon: <Mic /> }, { name: 'MicOff', icon: <MicOff /> },
      { name: 'Camera', icon: <Camera /> }, { name: 'Image', icon: <ImageIcon /> },
      { name: 'Film', icon: <Film /> }, { name: 'Music', icon: <Music /> },
    ],
  },
  {
    title: 'Communication',
    key: 'communication',
    icons: [
      { name: 'Mail', icon: <Mail /> }, { name: 'MessageSquare', icon: <MessageSquare /> },
      { name: 'Phone', icon: <Phone /> }, { name: 'Send', icon: <Send /> },
      { name: 'Bell', icon: <Bell /> }, { name: 'BellOff', icon: <BellOff /> },
      { name: 'AtSign', icon: <AtSign /> }, { name: 'Share2', icon: <Share2 /> },
    ],
  },
  {
    title: 'Files',
    key: 'files',
    icons: [
      { name: 'File', icon: <File /> }, { name: 'FileText', icon: <FileText /> },
      { name: 'Folder', icon: <Folder /> }, { name: 'FolderOpen', icon: <FolderOpen /> },
      { name: 'Download', icon: <Download /> }, { name: 'Upload', icon: <Upload /> },
      { name: 'Save', icon: <Save /> }, { name: 'Trash2', icon: <Trash2 /> }, { name: 'Archive', icon: <Archive /> },
    ],
  },
  {
    title: 'Interface',
    key: 'interface',
    icons: [
      { name: 'Menu', icon: <Menu /> }, { name: 'MoreHorizontal', icon: <MoreHorizontal /> },
      { name: 'MoreVertical', icon: <MoreVertical /> }, { name: 'Filter', icon: <Filter /> },
      { name: 'Grid', icon: <Grid /> }, { name: 'List', icon: <List /> },
      { name: 'Maximize2', icon: <Maximize2 /> }, { name: 'Minimize2', icon: <Minimize2 /> },
      { name: 'Eye', icon: <Eye /> }, { name: 'EyeOff', icon: <EyeOff /> }, { name: 'RefreshCw', icon: <RefreshCw /> },
    ],
  },
  {
    title: 'Status',
    key: 'status',
    icons: [
      { name: 'AlertCircle', icon: <AlertCircle /> }, { name: 'AlertTriangle', icon: <AlertTriangle /> },
      { name: 'Info', icon: <Info /> }, { name: 'CheckCircle', icon: <CheckCircle /> },
      { name: 'XCircle', icon: <XCircle /> }, { name: 'HelpCircle', icon: <HelpCircle /> },
      { name: 'Clock', icon: <Clock /> }, { name: 'Loader2', icon: <Loader2 /> },
    ],
  },
  {
    title: 'Social',
    key: 'social',
    icons: [
      { name: 'Heart', icon: <Heart /> }, { name: 'Star', icon: <Star /> },
      { name: 'ThumbsUp', icon: <ThumbsUp /> }, { name: 'ThumbsDown', icon: <ThumbsDown /> },
      { name: 'Bookmark', icon: <Bookmark /> }, { name: 'Flag', icon: <Flag /> }, { name: 'Award', icon: <Award /> },
    ],
  },
  {
    title: 'Security',
    key: 'security',
    icons: [
      { name: 'Lock', icon: <Lock /> }, { name: 'Unlock', icon: <Unlock /> },
      { name: 'Shield', icon: <Shield /> }, { name: 'Key', icon: <Key /> },
    ],
  },
  {
    title: 'Weather',
    key: 'weather',
    icons: [
      { name: 'Sun', icon: <Sun /> }, { name: 'Moon', icon: <Moon /> },
      { name: 'Cloud', icon: <Cloud /> }, { name: 'CloudRain', icon: <CloudRain /> }, { name: 'Zap', icon: <Zap /> },
    ],
  },
  {
    title: 'Editing',
    key: 'editing',
    icons: [
      { name: 'Edit3', icon: <Edit3 /> }, { name: 'Type', icon: <Type /> },
      { name: 'Bold', icon: <Bold /> }, { name: 'Italic', icon: <Italic /> }, { name: 'Underline', icon: <Underline /> },
      { name: 'AlignLeft', icon: <AlignLeft /> }, { name: 'AlignCenter', icon: <AlignCenter /> }, { name: 'AlignRight', icon: <AlignRight /> },
    ],
  },
  {
    title: 'Navigation',
    key: 'navigation',
    icons: [
      { name: 'Map', icon: <Map /> }, { name: 'MapPin', icon: <MapPin /> },
      { name: 'Navigation', icon: <Navigation /> }, { name: 'Compass', icon: <Compass /> }, { name: 'Globe', icon: <Globe /> },
    ],
  },
  {
    title: 'Commerce',
    key: 'commerce',
    icons: [
      { name: 'ShoppingCart', icon: <ShoppingCart /> }, { name: 'CreditCard', icon: <CreditCard /> },
      { name: 'DollarSign', icon: <DollarSign /> }, { name: 'Tag', icon: <Tag /> }, { name: 'Package', icon: <Package /> },
    ],
  },
];

function IconCard({ name, icon, onClick }: { name: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-[var(--radius-m)] border border-solid border-transparent bg-transparent cursor-pointer transition-all duration-fast hover:bg-[var(--secondary)] hover:border-[var(--border)] group"
    >
      <span className="w-5 h-5 text-[var(--foreground)] [&>svg]:w-5 [&>svg]:h-5 group-hover:text-[var(--primary)] transition-colors">
        {icon}
      </span>
      <span className="text-[10px] font-mono text-[var(--muted-foreground)] truncate max-w-full">{name}</span>
    </button>
  );
}

export default function IconsPage() {
  const pt = usePageTranslation('icons');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`import { ${name} } from '@tac-ui/icon';`).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Icons'}</DocTitle>
        <DocDescription>{pt?.description ?? 'Tac UI uses Lucide React for icons. Click any icon to copy its import statement.'}</DocDescription>
      </div>

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--foreground)] text-[var(--background)] text-sm px-4 py-2 rounded-[var(--radius-m)] shadow-lg">
          Copied: import {'{'} {copied} {'}'} from &apos;lucide-react&apos;
        </div>
      )}

      <DocSection title={pt?.sections?.['usage']?.title ?? 'Usage'}>
        <div className="rounded-[var(--radius-lg)] border border-solid border-[var(--border)] overflow-hidden">
          <div className="bg-[var(--card)] text-[var(--foreground)] p-4 font-mono text-[13px] leading-relaxed">
            <p className="text-[var(--muted-foreground)]">{'// Install'}</p>
            <p>npm install @tac-ui/icon</p>
            <br />
            <p className="text-[var(--muted-foreground)]">{'// Import'}</p>
            <p>{`import { Search, Heart, Bell } from '@tac-ui/icon';`}</p>
            <br />
            <p className="text-[var(--muted-foreground)]">{'// Use with size prop'}</p>
            <p>{`<Search size={20} />`}</p>
            <p>{`<Heart size={16} strokeWidth={2.5} />`}</p>
          </div>
        </div>
      </DocSection>

      {iconGroups.map((group) => (
        <DocSection key={group.key} title={pt?.sections?.[group.key]?.title ?? group.title}>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1">
            {group.icons.map((entry) => (
              <IconCard key={entry.name} name={entry.name} icon={entry.icon} onClick={() => handleCopy(entry.name)} />
            ))}
          </div>
        </DocSection>
      ))}

      <DocSection title={pt?.sections?.['all-icons']?.title ?? 'All Icons'}>
        <DocText>
          {pt?.sections?.['all-icons']?.texts?.[0] ?? 'Lucide provides 1500+ icons. Visit lucide.dev for the full library and search.'}
        </DocText>
      </DocSection>
    </DocPage>
  );
}
