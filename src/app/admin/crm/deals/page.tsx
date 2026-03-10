'use client';

import { useEffect, useState, useCallback } from 'react';
import { crmFetch } from '../components/api';

interface Deal {
  id: number;
  name: string;
  stage: string;
  amount: number;
  owner: string;
  created_at: string;
  companies: { id: number; name: string } | null;
  contacts: { id: number; firstname: string; lastname: string } | null;
}

const STAGE_COLORS: Record<string, string> = {
  discovery: 'bg-blue-500/20 text-blue-400',
  proposal: 'bg-indigo-500/20 text-indigo-400',
  negotiation: 'bg-amber-500/20 text-amber-400',
  closed_won: 'bg-emerald-500/20 text-emerald-400',
  closed_lost: 'bg-red-500/20 text-red-400',
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [stageFilter, setStageFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '25' });
    if (stageFilter) params.set('stage', stageFilter);
    const json = await crmFetch(`/api/admin/crm/deals?${params}`);
    if (json.ok) {
      setDeals(json.data);
      setTotal(json.total);
    }
    setLoading(false);
  }, [page, stageFilter]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / 25);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Deals</h1>
        <span className="text-sm text-slate-400">{total.toLocaleString()} total</span>
      </div>

      <select
        value={stageFilter}
        onChange={(e) => { setStageFilter(e.target.value); setPage(1); }}
        className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm"
      >
        <option value="">All stages</option>
        <option value="discovery">Discovery</option>
        <option value="proposal">Proposal</option>
        <option value="negotiation">Negotiation</option>
        <option value="closed_won">Closed Won</option>
        <option value="closed_lost">Closed Lost</option>
      </select>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
        ) : deals.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No deals found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-4 py-3 text-slate-400 font-medium">Deal</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Company</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Contact</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Stage</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Amount</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((d) => (
                <tr key={d.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-white">{d.name}</td>
                  <td className="px-4 py-3 text-slate-300">{d.companies?.name || '-'}</td>
                  <td className="px-4 py-3 text-slate-300">{d.contacts ? `${d.contacts.firstname} ${d.contacts.lastname}` : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STAGE_COLORS[d.stage] || 'bg-slate-500/20 text-slate-400'}`}>
                      {d.stage?.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">${Number(d.amount || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(d.created_at).toLocaleDateString()}</td>
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
