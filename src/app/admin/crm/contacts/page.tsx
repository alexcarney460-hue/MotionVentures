'use client';

import { useEffect, useState, useCallback } from 'react';
import { crmFetch } from '../components/api';
import StatusBadge from '../components/StatusBadge';

interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  lead_status: string;
  lifecycle_stage: string;
  source: string;
  created_at: string;
  companies: { id: number; name: string } | null;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '25' });
    if (search) params.set('search', search);
    if (statusFilter) params.set('lead_status', statusFilter);
    const json = await crmFetch(`/api/admin/crm/contacts?${params}`);
    if (json.ok) {
      setContacts(json.data);
      setTotal(json.total);
    }
    setLoading(false);
  }, [page, search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / 25);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Contacts</h1>
        <span className="text-sm text-slate-400">{total.toLocaleString()} total</span>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm"
        >
          <option value="">All statuses</option>
          <option value="NEW">New</option>
          <option value="OPEN">Open</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CONNECTED">Connected</option>
          <option value="UNQUALIFIED">Unqualified</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No contacts found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Email</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Company</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Source</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-white">{c.firstname} {c.lastname}</td>
                  <td className="px-4 py-3 text-slate-300">{c.email || '-'}</td>
                  <td className="px-4 py-3 text-slate-300">{c.companies?.name || '-'}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.lead_status || 'NEW'} /></td>
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
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded-lg disabled:opacity-30"
          >
            Prev
          </button>
          <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded-lg disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
