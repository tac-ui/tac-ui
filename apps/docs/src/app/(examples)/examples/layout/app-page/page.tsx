'use client';

import React from 'react';
import Link from 'next/link';
import { AppPage, Header, FloatingMenuBar, FloatingMenuItem } from '@tac-ui/web';
import {
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal,
  Home, Search, Bell, User, PlusCircle, Image as ImageIcon, MapPin, Smile,
} from '@tac-ui/icon';

interface PostData {
  user: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  image?: boolean;
  likes: number;
  comments: number;
  shares: number;
}

const feed: PostData[] = [
  { user: 'Alice Kim', handle: '@alice', avatar: 'A', time: '2h', content: 'Just finished setting up the new design system with Tac UI. The component library is incredibly well-structured and the theming support is fantastic!', image: true, likes: 42, comments: 7, shares: 3 },
  { user: 'Bob Park', handle: '@bob', avatar: 'B', time: '4h', content: 'Working on the mobile app today. The AppPage layout makes it so easy to build phone-optimized views.', likes: 18, comments: 2, shares: 1 },
  { user: 'Carol Lee', handle: '@carol', avatar: 'C', time: '6h', content: 'Design tokens are the future of consistent UI. Love how Tac UI handles light/dark themes seamlessly across platforms.', likes: 31, comments: 5, shares: 4 },
  { user: 'David Choi', handle: '@david', avatar: 'D', time: '8h', content: 'Shipped the new feature today! The elevated card style on desktop looks clean while still feeling native on mobile. Highly recommend trying out the AppPage component.', image: true, likes: 56, comments: 12, shares: 8 },
  { user: 'Eve Jung', handle: '@eve', avatar: 'E', time: '10h', content: 'Just deployed our landing page using Tac UI components. The responsive layout system saved us so much time. From mobile to desktop, everything just works.', likes: 73, comments: 15, shares: 11 },
  { user: 'Frank Oh', handle: '@frank', avatar: 'F', time: '12h', content: 'Pro tip: use the safeArea prop on AppPage when embedding in native webviews. It automatically handles the notch and home indicator spacing!', likes: 24, comments: 3, shares: 6 },
  { user: 'Grace Yoon', handle: '@grace', avatar: 'G', time: '14h', content: 'The Accordion component with the new collapsible sidebar groups is chef\'s kiss. Perfect for navigation menus with lots of sections.', likes: 39, comments: 8, shares: 2 },
  { user: 'Henry Lim', handle: '@henry', avatar: 'H', time: '16h', content: 'Comparing frameworks and Tac UI stands out for its simplicity. No complex setup, just install and start building.', likes: 45, comments: 6, shares: 9 },
  { user: 'Iris Kang', handle: '@iris', avatar: 'I', time: '18h', content: 'Built an entire dashboard in one afternoon using DashboardPage + Chart components. The design tokens keep everything consistent without effort.', image: true, likes: 88, comments: 21, shares: 14 },
  { user: 'Jay Shin', handle: '@jay', avatar: 'J', time: '20h', content: 'Hot take: good defaults matter more than infinite customization. Tac UI nails this balance perfectly.', likes: 62, comments: 17, shares: 7 },
];

function PostCard({ user, handle, avatar, time, content, image, likes, comments, shares }: PostData) {
  return (
    <div className="flex gap-3 px-4 py-3 border-b border-solid border-[var(--border)]">
      <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-sm font-bold text-[var(--primary-foreground)] shrink-0">
        {avatar}
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold truncate">{user}</span>
          <span className="text-xs text-[var(--muted-foreground)] truncate">{handle}</span>
          <span className="text-xs text-[var(--muted-foreground)]">·</span>
          <span className="text-xs text-[var(--muted-foreground)]">{time}</span>
          <button type="button" className="ml-auto p-1 rounded-full bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
        <p className="text-sm m-0 leading-relaxed">{content}</p>
        {image && (
          <div className="h-40 rounded-[var(--radius-lg)] bg-[var(--secondary)] flex items-center justify-center text-xs text-[var(--muted-foreground)] border border-solid border-[var(--border)]">
            <ImageIcon size={20} className="opacity-40" aria-hidden />
          </div>
        )}
        <div className="flex items-center gap-6 text-xs text-[var(--muted-foreground)]">
          <button type="button" className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors p-0">
            <Heart size={14} />
            <span>{likes}</span>
          </button>
          <button type="button" className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors p-0">
            <MessageCircle size={14} />
            <span>{comments}</span>
          </button>
          <button type="button" className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors p-0">
            <Share2 size={14} />
            <span>{shares}</span>
          </button>
          <button type="button" className="ml-auto bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors p-0">
            <Bookmark size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ComposeBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-solid border-[var(--border)] bg-[var(--card)]">
      <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-xs font-bold text-[var(--primary-foreground)] shrink-0">U</div>
      <div className="flex-1 text-sm text-[var(--muted-foreground)]">What&apos;s on your mind?</div>
      <div className="flex items-center gap-1">
        <button type="button" className="p-1.5 rounded-full bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
          <MapPin size={16} />
        </button>
        <button type="button" className="p-1.5 rounded-full bg-transparent border-none cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
          <Smile size={16} />
        </button>
      </div>
    </div>
  );
}

export default function AppPageExample() {
  return (
    <AppPage
      maxWidth="md"
      elevated
      header={
        <Header bordered sticky>
          <Link href="/components/layout" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">AppPage</span>
        </Header>
      }
    >
      <div className="flex flex-col -mx-4 -my-4">
        <ComposeBar />
        {feed.map((item, i) => (
          <PostCard key={i} {...item} />
        ))}
        <div className="h-16" />
      </div>
      <FloatingMenuBar>
        <FloatingMenuItem icon={<Home size={20} />} label="Home" active />
        <FloatingMenuItem icon={<Search size={20} />} label="Search" />
        <FloatingMenuItem icon={<PlusCircle size={20} />} label="Post" />
        <FloatingMenuItem icon={<Bell size={20} />} label="Alerts" />
        <FloatingMenuItem icon={<User size={20} />} label="Profile" />
      </FloatingMenuBar>
    </AppPage>
  );
}
