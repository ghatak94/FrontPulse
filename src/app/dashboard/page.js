'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Activity,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  HelpCircle,
  Home,
  Lightbulb,
  LogOut,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const navItems = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'Daily Standup', icon: CalendarDays },
  { label: 'Team Activity', icon: Users },
  { label: 'AI Insights', icon: BrainCircuit },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
];

const blockers = [
  {
    initials: 'MK',
    title: 'Authentication API down',
    copy: 'Blocked on integrating the new OAuth flow because the staging environment is currently returning 503s.',
    suggestion: 'DevOps reported staging maintenance. ETA is 2PM. Switch to local mock service (Branch: feat/mock-auth).',
  },
  {
    initials: 'SL',
    title: 'Figma Design System missing states',
    copy: 'Cannot complete the Data Table component. Hover and active states are missing from the master component.',
    suggestion: 'Tagged @design-team in Figma comment. Meanwhile, use the standard hover tokens from `theme.js` as temporary placeholders.',
  },
];

const pendingStandups = [
  { initials: 'AJ', name: 'Alex Johnson' },
  { initials: 'TR', name: 'Taylor Reed' },
  { initials: 'SM', name: 'Sam Miller' },
  { initials: 'EW', name: 'Elena Wei' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const getInitials = () => {
    const source = user?.displayName || user?.email || 'JD';
    return source
      .split(/[ @.]+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#faf7f7] text-[#141414]">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-80 flex-col border-r border-[#e8e2e2] bg-[#faf7f7] px-5 py-7 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#075ed3] text-white shadow-sm">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-[28px] font-extrabold leading-7 text-[#075ed3]">FrontPulse</div>
              <div className="mt-1 font-mono text-sm tracking-[0.14em] text-[#1f2937]">Frontend Intelligence</div>
            </div>
          </div>

          <nav className="mt-14 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`flex h-12 items-center gap-4 rounded-lg px-3 font-mono text-[16px] transition-colors ${
                    item.active
                      ? 'bg-[#0875f6] text-white shadow-sm'
                      : 'text-[#1f2937] hover:bg-white'
                  }`}
                >
                  <Icon size={24} strokeWidth={2.1} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-[#e8e2e2] pt-5">
            <button className="mb-6 flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-[#075ed3] font-mono text-[16px] font-semibold text-white shadow-sm transition-colors hover:bg-[#064fb4]">
              <Plus size={20} />
              <span>Submit Standup</span>
            </button>
            <div className="flex flex-col gap-5 font-mono text-[16px] text-[#1f2937]">
              <button className="flex items-center gap-4">
                <HelpCircle size={22} />
                <span>Help Center</span>
              </button>
              <button onClick={handleLogout} className="flex items-center gap-4">
                <LogOut size={22} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="lg:pl-80">
          <header className="sticky top-0 z-20 border-b border-[#e8e2e2] bg-[#faf7f7]/95 backdrop-blur">
            <div className="flex min-h-[98px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#075ed3] text-white lg:hidden">
                  <Activity size={24} />
                </div>
                <label className="flex h-12 w-full max-w-xl items-center overflow-hidden rounded-full border border-[#cfd5e3] bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#0875f6]/20">
                  <span className="flex h-full w-14 items-center justify-center border-r border-[#1f2937] text-[#667085]">
                    <Search size={22} />
                  </span>
                  <input
                    type="search"
                    placeholder="Search team, standups, blockers..."
                    className="h-full min-w-0 flex-1 bg-transparent px-4 text-[16px] text-[#4b5563] outline-none placeholder:text-[#667085]"
                  />
                </label>
              </div>

              <div className="flex items-center gap-4 sm:gap-7">
                <button className="relative hidden text-[#1f2937] sm:block" aria-label="Notifications">
                  <Bell size={25} />
                  <span className="absolute -right-0.5 top-0 h-2 w-2 rounded-full bg-[#cf1212]" />
                </button>
                <button className="hidden text-[#1f2937] sm:block" aria-label="Help">
                  <HelpCircle size={27} />
                </button>
                <button className="hidden border-x border-[#e8e2e2] px-8 font-mono text-[16px] text-[#111827] sm:block">
                  Support
                </button>
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'User avatar'}
                    width={42}
                    height={42}
                    unoptimized
                    className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0875f6] text-lg font-bold text-white shadow-md ring-2 ring-white">
                    {getInitials()}
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="px-5 py-10 sm:px-8 lg:px-12">
            <section className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-[40px] font-extrabold leading-tight tracking-[-0.02em] text-[#151515]">Overview</h1>
                <p className="mt-2 text-[20px] text-[#111827]">Sprint 42 &bull; Oct 12 - Oct 26</p>
              </div>
              <button className="h-12 w-fit rounded-lg border border-[#c9d2e3] bg-white px-6 font-mono text-[16px] text-[#111827] shadow-sm transition-colors hover:bg-[#f6f8fb]">
                Export Report
              </button>
            </section>

            <section className="grid grid-cols-1 gap-8 xl:grid-cols-[374px_minmax(0,1fr)]">
              <article className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="mb-12 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-[#075ed3]" size={23} />
                    <h2 className="text-[25px] font-bold">Team Health</h2>
                  </div>
                  <span className="rounded-full bg-[#e8f1ff] px-4 py-1.5 font-mono text-sm font-bold text-[#075ed3]">
                    &#8599; +4%
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative h-36 w-36">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e8e3e3" strokeWidth="10" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#075ed3"
                        strokeDasharray="289 314"
                        strokeLinecap="round"
                        strokeWidth="10"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[54px] font-extrabold leading-none">92</span>
                      <span className="mt-5 text-[28px] font-bold text-[#6b7280]">%</span>
                    </div>
                  </div>
                  <div className="mt-8 font-mono text-[18px] font-bold uppercase text-[#075ed3]">Excellent</div>
                </div>
              </article>

              <article className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-[25px] font-bold">Sprint Progress</h2>
                  <span className="w-fit rounded-full bg-[#efeded] px-4 py-2 font-mono text-[15px] text-[#111827]">
                    Day 8 of 14
                  </span>
                </div>

                <div className="mb-3 grid grid-cols-3 font-mono text-sm text-[#111827]">
                  <span>Completed (42)</span>
                  <span>In Progress (18)</span>
                  <span className="text-right">To Do (12)</span>
                </div>
                <div className="flex h-5 overflow-hidden rounded-full bg-[#e6e1e1]">
                  <div className="w-[58%] bg-[#075ed3]" />
                  <div className="w-[25%] bg-[#9b4ae8]" />
                  <div className="flex-1 bg-[#e6e1e1]" />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {[
                    ['Velocity', '34 pts'],
                    ['Scope Change', '+2 pts'],
                    ['Est. Completion', 'On Track'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-[#e3dfdf] bg-[#f8f6f6] p-5">
                      <div className="font-mono text-sm uppercase tracking-[0.1em] text-[#111827]">{label}</div>
                      <div className={`mt-1 text-[30px] font-extrabold leading-tight ${value === 'On Track' ? 'text-[#075ed3]' : ''}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_374px]">
              <article className="rounded-xl border border-[#d7b4ff] bg-[linear-gradient(105deg,#ffffff_0%,#fffafa_68%,#fbf1ff_100%)] p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="text-[#7f1df2]" size={25} />
                    <h2 className="text-[25px] font-bold">Active Blockers & Insights</h2>
                  </div>
                  <span className="w-fit rounded-full bg-[#ffe1dc] px-4 py-1.5 font-mono text-sm font-bold text-[#a80000]">
                    3 Urgent
                  </span>
                </div>

                <div className="space-y-4">
                  {blockers.map((blocker) => (
                    <div key={blocker.title} className="border-l-4 border-[#cf1212] pl-5">
                      <div className="rounded-xl bg-white p-5 shadow-sm">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#efeded] text-xs font-bold">
                              {blocker.initials}
                            </span>
                            <h3 className="min-w-0 truncate font-mono text-[17px] font-extrabold">{blocker.title}</h3>
                          </div>
                          <span className="rounded bg-[#fae8e8] px-3 py-1 font-mono text-sm font-bold uppercase text-[#cf1212]">
                            Urgent
                          </span>
                        </div>
                        <p className="text-[18px] leading-7 text-[#1f2937]">{blocker.copy}</p>
                        <div className="mt-4 rounded border border-[#ead8ff] bg-[#fbf6ff] px-4 py-3 font-mono text-[15px] leading-5">
                          <span className="font-bold text-[#7f1df2]">✦ AI Suggestion:</span> {blocker.suggestion}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="flex min-h-[410px] flex-col rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="mb-10 flex items-start justify-between">
                  <h2 className="text-[25px] font-bold leading-tight">
                    Pending
                    <br />
                    Standups
                  </h2>
                  <span className="font-mono text-sm leading-4 text-[#667085]">
                    4 of 12
                    <br />
                    left
                  </span>
                </div>

                <div className="space-y-6">
                  {pendingStandups.map((person) => (
                    <div key={person.name} className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efeded] text-[17px] text-[#374151] shadow-inner">
                        {person.initials}
                      </span>
                      <span className="text-[20px] text-[#202020]">{person.name}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-auto self-center font-mono text-[18px] text-[#075ed3] transition-colors hover:text-[#064fb4]">
                  Remind All in Slack
                </button>
              </article>
            </section>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
