'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setAdminToken, getAdminToken } from './components/api';
import { getSupabase } from '@/lib/supabase';

const ADMIN_EMAIL = 'gardenablaze@gmail.com';

const NAV = [
  { label: 'Dashboard', href: '/admin/crm' },
  { label: 'Contacts', href: '/admin/crm/contacts' },
  { label: 'Companies', href: '/admin/crm/companies' },
  { label: 'Deals', href: '/admin/crm/deals' },
  { label: 'Lists', href: '/admin/crm/lists' },
];

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [token, setToken] = useState(() => getAdminToken());
  const [input, setInput] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getUser();
        const email = data.user?.email?.toLowerCase()
          || (await supabase.auth.getSession()).data.session?.user?.email?.toLowerCase();
        if (email === ADMIN_EMAIL) {
          setAuthorized(true);
          setAdminToken('mv-admin-2026-secure');
          setToken('mv-admin-2026-secure');
        }
      } catch {
        // Supabase not configured — fall through to token auth
      }
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Checking access...</div>
      </div>
    );
  }

  if (!authorized && !token) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-white mb-2">CRM Access</h1>
          <p className="text-sm text-slate-400 mb-4">
            Sign in as admin or enter your API token.
          </p>
          <Link
            href="/auth/login"
            className="block w-full px-4 py-2.5 mb-3 bg-sky-600 hover:bg-sky-500 text-white text-center rounded-lg font-medium transition-colors text-sm"
          >
            Sign In with Email
          </Link>
          <div className="text-center text-xs text-slate-500 mb-3">or enter token directly</div>
          <input
            type="password"
            placeholder="Admin token"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                setAdminToken(input.trim());
                setToken(input.trim());
              }
            }}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-3 text-sm"
          />
          <button
            onClick={() => {
              if (input.trim()) {
                setAdminToken(input.trim());
                setToken(input.trim());
              }
            }}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Enter Token
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-sky-400 mr-4">MV CRM</span>
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-sky-500/20 text-sky-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <button
              onClick={async () => {
                setAdminToken('');
                setToken('');
                setAuthorized(false);
                const supabase = getSupabase();
                await supabase.auth.signOut();
                router.push('/');
              }}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
