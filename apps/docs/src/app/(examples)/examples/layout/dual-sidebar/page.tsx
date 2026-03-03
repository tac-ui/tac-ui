'use client';

import React from 'react';
import Link from 'next/link';
import { DualSidebarPage, Header, SidebarGroup, SidebarItem, SidebarContent } from '@tac-ui/web';
import { ArrowLeft, Hash, MessageSquare, Users } from '@tac-ui/icon';

const channels = [
  { name: 'general', unread: 3 },
  { name: 'engineering', unread: 0 },
  { name: 'design', unread: 1 },
  { name: 'marketing', unread: 0 },
  { name: 'random', unread: 5 },
];

const members = [
  { name: 'Alice Kim', status: 'online' },
  { name: 'Bob Park', status: 'online' },
  { name: 'Carol Lee', status: 'away' },
  { name: 'David Choi', status: 'offline' },
  { name: 'Eve Jung', status: 'online' },
];

export default function DualSidebarExample() {
  return (
    <DualSidebarPage
      leftWidth={220}
      rightWidth={240}
      leftCollapsible
      rightCollapsible
      leftLabel="Channels"
      leftIcon={<MessageSquare size={16} />}
      rightLabel="Details"
      rightIcon={<Users size={16} />}
      header={
        <Header bordered sticky>
          <Link href="/components/layout" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">DualSidebarPage</span>
        </Header>
      }
      leftSidebar={
        <SidebarGroup label="Channels">
          {channels.map((ch) => (
            <SidebarItem key={ch.name} icon={<Hash size={14} />} active={ch.name === 'general'}>
              <span className="flex-1">{ch.name}</span>
              {ch.unread > 0 && (
                <span className="text-[10px] bg-[var(--primary)] text-[var(--primary-foreground)] px-1.5 py-0.5 rounded-full font-medium">{ch.unread}</span>
              )}
            </SidebarItem>
          ))}
        </SidebarGroup>
      }
      rightSidebar={
        <>
          <SidebarContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <Hash size={14} className="text-[var(--muted-foreground)]" />
                <span className="font-medium">general</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] m-0">Company-wide announcements and discussion.</p>
            </div>
          </SidebarContent>
          <SidebarGroup label="Members">
            {members.map((m) => (
              <SidebarItem key={m.name}>
                <div className="w-6 h-6 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[10px] font-medium shrink-0">{m.name[0]}</div>
                <span className="flex-1 text-xs">{m.name}</span>
                <div className={`w-2 h-2 rounded-full ${m.status === 'online' ? 'bg-green-500' : m.status === 'away' ? 'bg-yellow-500' : 'bg-[var(--border)]'}`} />
              </SidebarItem>
            ))}
          </SidebarGroup>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-3 border-b border-solid border-[var(--border)]">
          <Hash size={18} className="text-[var(--muted-foreground)]" />
          <span className="font-semibold">general</span>
        </div>
        {[
          { user: 'Alice', time: '10:32 AM', msg: 'Good morning everyone! Quick reminder about the all-hands meeting at 2pm today.' },
          { user: 'Bob', time: '10:45 AM', msg: 'Thanks Alice! I\'ll prepare the Q3 report slides.' },
          { user: 'Carol', time: '11:02 AM', msg: 'Has anyone reviewed the new design mockups? I\'d love to get some feedback before the meeting.' },
        ].map((m, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-sm font-medium shrink-0">{m.user[0]}</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{m.user}</span>
                <span className="text-xs text-[var(--muted-foreground)]">{m.time}</span>
              </div>
              <p className="text-sm m-0">{m.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </DualSidebarPage>
  );
}
