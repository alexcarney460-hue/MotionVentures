'use client';

import { useEffect, useState, useCallback } from 'react';
import { crmFetch } from '../components/api';

interface Company {
  id: number;
  name: string;
  domain: string;
  phone: string;
  city: string;
  state: string;
  industry: string;
  website_age: string;
  rating: number;
  source: string;
  created_at: string;
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '25' });
    if (search) params.set('search', search);
    const json = await crmFetch(`/api/admin/crm/companies?${params}`);
    if (json.ok) {
      setCompanies(json.data);
      setTotal(json.total);
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / 25);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Companies</h1>
        <span className="text-sm text-slate-400">{total.toLocaleString()} total</span>
      </div>

      <input
        type="text"
        placeholder="Search by name, domain, or city..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm"
      />

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
        ) : companies.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No companies found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Domain</th>
                <th className="px-4 py-3 text-slate-400 font-medium">City</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Industry</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Website</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Source</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-white">{c.name}</td>
                  <td className="px-4 py-3 text-sky-400">{c.domain || '-'}</td>
                  <td className="px-4 py-3 text-slate-300">{c.city}{c.state ? `, ${c.state}` : ''}</td>
                  <td className="px-4 py-3 text-slate-300">{c.industry || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      c.website_age === 'none' ? 'bg-red-500/20 text-red-400' :
                      c.website_age === 'outdated' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {c.website_age || 'unknown'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{c.source || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded-lg disabled:opacity-30">Prev</button>
          <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded-lg disabled:opacity-30">Next</button>
        </div>
      )}
    </div>
  );
}
