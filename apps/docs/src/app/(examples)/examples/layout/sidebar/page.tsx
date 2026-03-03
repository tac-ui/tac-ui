'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarPage, Header, SidebarGroup, SidebarItem } from '@tac-ui/web';
import { ArrowLeft, Home, Inbox, FileText, Settings, Users, BarChart3, Menu } from '@tac-ui/icon';

export default function SidebarExample() {
  return (
    <SidebarPage
      sidebarWidth={260}
      sidebarPosition="left"
      collapsible
      sidebarLabel="Workspace"
      sidebarIcon={<Menu size={18} />}
      header={
        <Header bordered sticky>
          <Link href="/components/layout" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">SidebarPage</span>
        </Header>
      }
      sidebar={
        <SidebarGroup label="Navigation">
          <SidebarItem icon={<Home size={16} />}>Home</SidebarItem>
          <SidebarItem icon={<Inbox size={16} />} active>Inbox</SidebarItem>
          <SidebarItem icon={<FileText size={16} />}>Documents</SidebarItem>
          <SidebarItem icon={<Users size={16} />}>Team</SidebarItem>
          <SidebarItem icon={<BarChart3 size={16} />}>Analytics</SidebarItem>
          <SidebarItem icon={<Settings size={16} />}>Settings</SidebarItem>
        </SidebarGroup>
      }
    >
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold m-0">Inbox</h1>
          <p className="text-sm text-[var(--muted-foreground)] m-0 mt-1">You have 3 unread messages</p>
        </div>
        {['Design review feedback', 'Sprint planning notes', 'API documentation update'].map((title, i) => (
          <div key={i} className="p-4 rounded-[var(--radius-m)] border border-solid border-[var(--border)] bg-[var(--card)] flex flex-col gap-2 hover:border-[var(--primary)]/40 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{title}</span>
              <span className="text-xs text-[var(--muted-foreground)]">{i + 1}h ago</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
          </div>
        ))}
      </div>
    </SidebarPage>
  );
}
