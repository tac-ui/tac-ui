'use client';

import React, { useState } from 'react';
import {
  // General
  Search,
  Settings,
  Home,
  User,
  Users,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Link,
  Copy,
  Clipboard,
  // Media
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  Image as ImageIcon,
  Film,
  Music,
  // Communication
  Mail,
  MessageSquare,
  Phone,
  Send,
  Bell,
  BellOff,
  AtSign,
  Share2,
  // Files
  File,
  FileText,
  Folder,
  FolderOpen,
  Download,
  Upload,
  Save,
  Trash2,
  Archive,
  // Interface
  Menu,
  MoreHorizontal,
  MoreVertical,
  Filter,
  Grid,
  List,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  RefreshCw,
  // Status
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
  Loader2,
  // Social
  Heart,
  Star,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Flag,
  Award,
  // Security
  Lock,
  Unlock,
  Shield,
  Key,
  // Weather
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Zap,
  // Editing
  Edit3,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  // Navigation
  Map,
  MapPin,
  Navigation,
  Compass,
  Globe,
  // Commerce
  ShoppingCart,
  CreditCard,
  DollarSign,
  Tag,
  Package,
} from '@tac-ui/icon-native';
import { usePageTranslation } from '@/i18n';
import { DocPage, DocTitle, DocDescription, DocSection, DocText, PreviewCode } from '@/components/docs/DocPage';
import { nativeNavGroups } from '@/components/docs/nav-data-native';

interface IconEntry {
  name: string;
  icon: React.ReactNode;
}

const iconGroups: { title: string; key: string; icons: IconEntry[] }[] = [
  {
    title: 'General',
    key: 'general',
    icons: [
      { name: 'Search', icon: <Search size={20} /> },
      { name: 'Settings', icon: <Settings size={20} /> },
      { name: 'Home', icon: <Home size={20} /> },
      { name: 'User', icon: <User size={20} /> },
      { name: 'Users', icon: <Users size={20} /> },
      { name: 'Plus', icon: <Plus size={20} /> },
      { name: 'Minus', icon: <Minus size={20} /> },
      { name: 'X', icon: <X size={20} /> },
      { name: 'Check', icon: <Check size={20} /> },
      { name: 'ChevronDown', icon: <ChevronDown size={20} /> },
      { name: 'ChevronUp', icon: <ChevronUp size={20} /> },
      { name: 'ChevronLeft', icon: <ChevronLeft size={20} /> },
      { name: 'ChevronRight', icon: <ChevronRight size={20} /> },
      { name: 'ArrowLeft', icon: <ArrowLeft size={20} /> },
      { name: 'ArrowRight', icon: <ArrowRight size={20} /> },
      { name: 'ArrowUp', icon: <ArrowUp size={20} /> },
      { name: 'ArrowDown', icon: <ArrowDown size={20} /> },
      { name: 'ExternalLink', icon: <ExternalLink size={20} /> },
      { name: 'Link', icon: <Link size={20} /> },
      { name: 'Copy', icon: <Copy size={20} /> },
      { name: 'Clipboard', icon: <Clipboard size={20} /> },
    ],
  },
  {
    title: 'Media',
    key: 'media',
    icons: [
      { name: 'Play', icon: <Play size={20} /> },
      { name: 'Pause', icon: <Pause size={20} /> },
      { name: 'SkipBack', icon: <SkipBack size={20} /> },
      { name: 'SkipForward', icon: <SkipForward size={20} /> },
      { name: 'Volume2', icon: <Volume2 size={20} /> },
      { name: 'VolumeX', icon: <VolumeX size={20} /> },
      { name: 'Mic', icon: <Mic size={20} /> },
      { name: 'MicOff', icon: <MicOff size={20} /> },
      { name: 'Camera', icon: <Camera size={20} /> },
      { name: 'Image', icon: <ImageIcon size={20} /> },
      { name: 'Film', icon: <Film size={20} /> },
      { name: 'Music', icon: <Music size={20} /> },
    ],
  },
  {
    title: 'Communication',
    key: 'communication',
    icons: [
      { name: 'Mail', icon: <Mail size={20} /> },
      { name: 'MessageSquare', icon: <MessageSquare size={20} /> },
      { name: 'Phone', icon: <Phone size={20} /> },
      { name: 'Send', icon: <Send size={20} /> },
      { name: 'Bell', icon: <Bell size={20} /> },
      { name: 'BellOff', icon: <BellOff size={20} /> },
      { name: 'AtSign', icon: <AtSign size={20} /> },
      { name: 'Share2', icon: <Share2 size={20} /> },
    ],
  },
  {
    title: 'Files',
    key: 'files',
    icons: [
      { name: 'File', icon: <File size={20} /> },
      { name: 'FileText', icon: <FileText size={20} /> },
      { name: 'Folder', icon: <Folder size={20} /> },
      { name: 'FolderOpen', icon: <FolderOpen size={20} /> },
      { name: 'Download', icon: <Download size={20} /> },
      { name: 'Upload', icon: <Upload size={20} /> },
      { name: 'Save', icon: <Save size={20} /> },
      { name: 'Trash2', icon: <Trash2 size={20} /> },
      { name: 'Archive', icon: <Archive size={20} /> },
    ],
  },
  {
    title: 'Interface',
    key: 'interface',
    icons: [
      { name: 'Menu', icon: <Menu size={20} /> },
      { name: 'MoreHorizontal', icon: <MoreHorizontal size={20} /> },
      { name: 'MoreVertical', icon: <MoreVertical size={20} /> },
      { name: 'Filter', icon: <Filter size={20} /> },
      { name: 'Grid', icon: <Grid size={20} /> },
      { name: 'List', icon: <List size={20} /> },
      { name: 'Maximize2', icon: <Maximize2 size={20} /> },
      { name: 'Minimize2', icon: <Minimize2 size={20} /> },
      { name: 'Eye', icon: <Eye size={20} /> },
      { name: 'EyeOff', icon: <EyeOff size={20} /> },
      { name: 'RefreshCw', icon: <RefreshCw size={20} /> },
    ],
  },
  {
    title: 'Status',
    key: 'status',
    icons: [
      { name: 'AlertCircle', icon: <AlertCircle size={20} /> },
      { name: 'AlertTriangle', icon: <AlertTriangle size={20} /> },
      { name: 'Info', icon: <Info size={20} /> },
      { name: 'CheckCircle', icon: <CheckCircle size={20} /> },
      { name: 'XCircle', icon: <XCircle size={20} /> },
      { name: 'HelpCircle', icon: <HelpCircle size={20} /> },
      { name: 'Clock', icon: <Clock size={20} /> },
      { name: 'Loader2', icon: <Loader2 size={20} /> },
    ],
  },
  {
    title: 'Social',
    key: 'social',
    icons: [
      { name: 'Heart', icon: <Heart size={20} /> },
      { name: 'Star', icon: <Star size={20} /> },
      { name: 'ThumbsUp', icon: <ThumbsUp size={20} /> },
      { name: 'ThumbsDown', icon: <ThumbsDown size={20} /> },
      { name: 'Bookmark', icon: <Bookmark size={20} /> },
      { name: 'Flag', icon: <Flag size={20} /> },
      { name: 'Award', icon: <Award size={20} /> },
    ],
  },
  {
    title: 'Security',
    key: 'security',
    icons: [
      { name: 'Lock', icon: <Lock size={20} /> },
      { name: 'Unlock', icon: <Unlock size={20} /> },
      { name: 'Shield', icon: <Shield size={20} /> },
      { name: 'Key', icon: <Key size={20} /> },
    ],
  },
  {
    title: 'Weather',
    key: 'weather',
    icons: [
      { name: 'Sun', icon: <Sun size={20} /> },
      { name: 'Moon', icon: <Moon size={20} /> },
      { name: 'Cloud', icon: <Cloud size={20} /> },
      { name: 'CloudRain', icon: <CloudRain size={20} /> },
      { name: 'Zap', icon: <Zap size={20} /> },
    ],
  },
  {
    title: 'Editing',
    key: 'editing',
    icons: [
      { name: 'Edit3', icon: <Edit3 size={20} /> },
      { name: 'Type', icon: <Type size={20} /> },
      { name: 'Bold', icon: <Bold size={20} /> },
      { name: 'Italic', icon: <Italic size={20} /> },
      { name: 'Underline', icon: <Underline size={20} /> },
      { name: 'AlignLeft', icon: <AlignLeft size={20} /> },
      { name: 'AlignCenter', icon: <AlignCenter size={20} /> },
      { name: 'AlignRight', icon: <AlignRight size={20} /> },
    ],
  },
  {
    title: 'Navigation',
    key: 'navigation',
    icons: [
      { name: 'Map', icon: <Map size={20} /> },
      { name: 'MapPin', icon: <MapPin size={20} /> },
      { name: 'Navigation', icon: <Navigation size={20} /> },
      { name: 'Compass', icon: <Compass size={20} /> },
      { name: 'Globe', icon: <Globe size={20} /> },
    ],
  },
  {
    title: 'Commerce',
    key: 'commerce',
    icons: [
      { name: 'ShoppingCart', icon: <ShoppingCart size={20} /> },
      { name: 'CreditCard', icon: <CreditCard size={20} /> },
      { name: 'DollarSign', icon: <DollarSign size={20} /> },
      { name: 'Tag', icon: <Tag size={20} /> },
      { name: 'Package', icon: <Package size={20} /> },
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
      <span className="w-5 h-5 text-[var(--foreground)] [&>svg]:w-5 [&>svg]:h-5 group-hover:text-[var(--primary)] transition-colors flex items-center justify-center">
        {icon}
      </span>
      <span className="text-[10px] font-mono text-[var(--muted-foreground)] truncate max-w-full">{name}</span>
    </button>
  );
}

export default function NativeIconsPage() {
  const pt = usePageTranslation('native-icons');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`import { ${name} } from '@tac-ui/icon-native';`).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <DocPage navGroups={nativeNavGroups}>
      <div>
        <DocTitle>{pt?.title ?? 'Icons'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'Tac UI Native uses lucide-react-native for icons. Click any icon to copy its import statement.'}
        </DocDescription>
      </div>

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--foreground)] text-[var(--background)] text-sm px-4 py-2 rounded-[var(--radius-m)] shadow-lg">
          Copied: import {'{'} {copied} {'}'} from &apos;@tac-ui/icon-native&apos;
        </div>
      )}

      <DocSection title={pt?.sections?.['usage']?.title ?? 'Usage'}>
        <PreviewCode
          code={`// Install
npm install @tac-ui/icon-native react-native-svg

// Import
import { Search, Heart, Bell } from '@tac-ui/icon-native';

// Use with size and color props
<Search size={20} color={theme.colors.foreground} />
<Heart size={16} color={theme.colors.error} strokeWidth={2.5} />`}
        />
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
          {pt?.sections?.['all-icons']?.texts?.[0] ??
            'Lucide provides 1500+ icons. Visit lucide.dev for the full library and search. All icons from lucide-react-native are available through @tac-ui/icon-native.'}
        </DocText>
      </DocSection>
    </DocPage>
  );
}
