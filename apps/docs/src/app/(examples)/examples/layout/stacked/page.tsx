'use client';

import React from 'react';
import Link from 'next/link';
import { StackedPage, Header, Footer } from '@tac-ui/web';
import { ArrowLeft, Sparkles, Zap, Shield } from '@tac-ui/icon';

export default function StackedExample() {
  return (
    <StackedPage
      header={
        <Header bordered sticky>
          <Link href="/components/layout" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <span className="text-[var(--muted-foreground)] cursor-pointer hover:text-[var(--foreground)] transition-colors">Features</span>
            <span className="text-[var(--muted-foreground)] cursor-pointer hover:text-[var(--foreground)] transition-colors">Pricing</span>
            <span className="text-[var(--muted-foreground)] cursor-pointer hover:text-[var(--foreground)] transition-colors">Contact</span>
          </div>
        </Header>
      }
      footer={
        <Footer bordered>
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] py-2">
            <span>2026 Acme Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-[var(--foreground)]">Privacy</span>
              <span className="cursor-pointer hover:text-[var(--foreground)]">Terms</span>
            </div>
          </div>
        </Footer>
      }
    >
      {/* Hero */}
      <section className="py-20 px-6 flex flex-col items-center text-center bg-gradient-to-b from-[var(--secondary)] to-[var(--background)]">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-4">New Release</span>
        <h1 className="text-4xl md:text-5xl font-bold m-0 max-w-4xl leading-tight">Build products faster with our platform</h1>
        <p className="text-lg text-[var(--muted-foreground)] m-0 mt-4 max-w-3xl">Streamline your workflow with powerful tools designed for modern teams.</p>
        <div className="flex gap-3 mt-8">
          <div className="px-6 py-2.5 rounded-[var(--radius-m)] bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium cursor-pointer">Get Started</div>
          <div className="px-6 py-2.5 rounded-[var(--radius-m)] border border-solid border-[var(--border)] text-sm font-medium cursor-pointer hover:bg-[var(--secondary)] transition-colors">Learn More</div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center m-0 mb-10">Why choose us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'Intuitive', desc: 'Clean and simple interface that anyone can use.' },
              { icon: Zap, title: 'Fast', desc: 'Optimized performance for the best experience.' },
              { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security built in from day one.' },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[var(--primary)]" />
                  </div>
                  <h3 className="text-base font-semibold m-0">{f.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] m-0">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[var(--secondary)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold m-0">Ready to get started?</h2>
          <p className="text-[var(--muted-foreground)] m-0 mt-2">Join thousands of teams already using our platform.</p>
          <div className="mt-6 px-8 py-3 rounded-[var(--radius-m)] bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium cursor-pointer inline-block">
            Start Free Trial
          </div>
        </div>
      </section>
    </StackedPage>
  );
}
