'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardPage, Header, SidebarGroup, SidebarItem } from '@tac-ui/web';
import {
  ArrowLeft,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  Package,
  Activity,
} from '@tac-ui/icon';

const stats = [
  { icon: DollarSign, label: 'Revenue', value: '$45,231', change: '+20.1%' },
  { icon: Users, label: 'Customers', value: '2,350', change: '+12.5%' },
  { icon: ShoppingCart, label: 'Orders', value: '1,247', change: '+8.2%' },
  { icon: Activity, label: 'Active Now', value: '573', change: '+4.1%' },
];

export default function DashboardExample() {
  return (
    <DashboardPage
      sidebarWidth={240}
      collapsible
      sidebarLabel="Acme Inc"
      sidebarIcon={<TrendingUp size={18} className="text-[var(--primary)]" />}
      sidebarRounded
      header={
        <Header bordered sticky>
          <Link
            href="/web/components/layout"
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to docs
          </Link>
          <span className="ml-auto text-sm font-medium">DashboardPage</span>
        </Header>
      }
      sidebar={
        <SidebarGroup label="Menu">
          <SidebarItem variant="filled" size="md" icon={<LayoutDashboard size={16} />} active>
            Dashboard
          </SidebarItem>
          <SidebarItem variant="filled" size="md" icon={<ShoppingCart size={16} />}>Orders</SidebarItem>
          <SidebarItem variant="filled" size="md" icon={<Package size={16} />}>Products</SidebarItem>
          <SidebarItem variant="filled" size="md" icon={<Users size={16} />}>Customers</SidebarItem>
          <SidebarItem variant="filled" size="md" icon={<Settings size={16} />}>Settings</SidebarItem>
        </SidebarGroup>
      }
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold m-0">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-4 rounded-[var(--radius-m)] border border-solid border-[var(--border)] bg-[var(--card)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--muted-foreground)] font-medium">{stat.label}</span>
                  <Icon size={14} className="text-[var(--muted-foreground)]" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <span className="text-xs text-green-600">{stat.change} from last month</span>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-6 rounded-[var(--radius-m)] border border-solid border-[var(--border)] bg-[var(--card)] h-64 flex items-center justify-center text-[var(--muted-foreground)]">
            Revenue Chart
          </div>
          <div className="p-6 rounded-[var(--radius-m)] border border-solid border-[var(--border)] bg-[var(--card)] h-64 flex items-center justify-center text-[var(--muted-foreground)]">
            Orders Overview
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
