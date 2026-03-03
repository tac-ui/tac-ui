'use client';

import React from 'react';
import Link from 'next/link';
import { HolyGrailPage, Header, Footer, SidebarGroup, SidebarItem, SidebarContent } from '@tac-ui/web';
import { ArrowLeft, BookOpen, FileText, Code, Layers } from '@tac-ui/icon';

const relatedDocs = [
  { title: 'Migration Guide', desc: 'Upgrading from v1 to v2' },
  { title: 'Plugin System', desc: 'Extending functionality' },
  { title: 'Troubleshooting', desc: 'Common issues and fixes' },
];

export default function HolyGrailExample() {
  return (
    <HolyGrailPage
      leftWidth={220}
      rightWidth={200}
      leftCollapsible
      rightCollapsible
      leftLabel="Documentation"
      leftIcon={<BookOpen size={16} />}
      rightLabel="On This Page"
      header={
        <Header bordered sticky>
          <Link href="/components/layout" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <div className="ml-auto flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
            <span className="cursor-pointer hover:text-[var(--foreground)]">Docs</span>
            <span className="cursor-pointer hover:text-[var(--foreground)]">API</span>
            <span className="cursor-pointer hover:text-[var(--foreground)]">Blog</span>
          </div>
        </Header>
      }
      footer={
        <Footer bordered>
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Documentation v2.0</span>
            <span>Last updated: March 2026</span>
          </div>
        </Footer>
      }
      leftSidebar={
        <SidebarGroup label="Documentation">
          <SidebarItem icon={<BookOpen size={14} />} active>Getting Started</SidebarItem>
          <SidebarItem icon={<Layers size={14} />}>Components</SidebarItem>
          <SidebarItem icon={<Code size={14} />}>API</SidebarItem>
          <SidebarItem icon={<FileText size={14} />}>Guides</SidebarItem>
        </SidebarGroup>
      }
      rightSidebar={
        <>
          <SidebarContent>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">On This Page</div>
              {['Introduction', 'Installation', 'Quick Start', 'Configuration', 'API Reference', 'Examples'].map((item, i) => (
                <div
                  key={item}
                  className={`py-1 text-xs cursor-pointer transition-colors rounded-[var(--radius-sm)] ${
                    i === 0 ? 'text-[var(--primary)] font-medium' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </SidebarContent>
          <SidebarGroup label="Related">
            {relatedDocs.map((doc) => (
              <SidebarItem key={doc.title}>
                <div>
                  <div className="text-xs font-medium">{doc.title}</div>
                  <div className="text-[10px] text-[var(--muted-foreground)]">{doc.desc}</div>
                </div>
              </SidebarItem>
            ))}
          </SidebarGroup>
        </>
      }
    >
      <article className="flex flex-col gap-6 max-w-none">
        <div>
          <h1 className="text-2xl font-bold m-0">Getting Started</h1>
          <p className="text-[var(--muted-foreground)] m-0 mt-2">Learn how to set up and configure the framework in your project.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold m-0">Introduction</h2>
          <p className="text-sm leading-relaxed m-0">This framework provides a comprehensive set of tools for building modern web applications. It includes a component library, state management utilities, and an extensive plugin system.</p>
          <h2 className="text-lg font-semibold m-0 mt-2">Installation</h2>
          <div className="p-3 rounded-[var(--radius-m)] bg-[var(--secondary)] font-mono text-sm">
            npm install @acme/framework
          </div>
          <h2 className="text-lg font-semibold m-0 mt-2">Quick Start</h2>
          <p className="text-sm leading-relaxed m-0">After installation, import the provider and wrap your application root. This enables all framework features including theming, state management, and component rendering.</p>
          <div className="p-4 rounded-[var(--radius-m)] bg-[var(--secondary)] font-mono text-sm leading-relaxed whitespace-pre">{`import { Provider } from '@acme/framework';

export default function App() {
  return (
    <Provider>
      <YourApp />
    </Provider>
  );
}`}</div>
        </div>
      </article>
    </HolyGrailPage>
  );
}
