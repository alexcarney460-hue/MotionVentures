'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setAdminToken, getAdminToken } from '../crm/components/api';
import { getSupabase } from '@/lib/supabase';

const ADMIN_EMAIL = 'gardenablaze@gmail.com';

export default function MissionControlLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [token, setToken] = useState(() => getAdminToken());

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
      } catch {}
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono text-sm animate-pulse">LOADING MISSION CONTROL...</div>
      </div>
    );
  }

  if (!authorized && !token) {
    router.push('/admin/crm');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* CRT Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50" style={{
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
      }} />

      <nav className="border-b-2 border-green-900 bg-black/90 sticky top-0 z-40 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
          <div className="flex items-center gap-4">
            <span className="text-green-400 font-bold tracking-widest text-xs">
              {'>'} MISSION_CONTROL v2.0
            </span>
            <div className="flex gap-1">
              {[
                { label: 'HQ', href: '/admin/mission-control' },
                { label: 'CRM', href: '/admin/crm' },
              ].map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1 text-xs border transition-colors ${
                      active
                        ? 'border-green-400 text-green-300 bg-green-900/30'
                        : 'border-green-900 text-green-600 hover:text-green-400 hover:border-green-600'
                    }`}
                  >
                    [{item.label}]
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-600 text-xs">
              SYS.TIME {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </span>
            <button
              onClick={async () => {
                setAdminToken('');
                setToken('');
                setAuthorized(false);
                const supabase = getSupabase();
                await supabase.auth.signOut();
                router.push('/');
              }}
              className="text-xs text-red-800 hover:text-red-400 transition-colors border border-red-900 px-2 py-0.5"
            >
              [LOGOUT]
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  );
}
