'use client';

import { useEffect, useState } from 'react';
import { crmFetch } from '../components/api';

interface List {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export default function ListsPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const json = await crmFetch('/api/admin/crm/lists');
      if (json.ok) setLists(json.data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Lists</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
        ) : lists.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No lists yet</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-4 py-3 text-slate-400 font-medium">Name</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Description</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((l) => (
                <tr key={l.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{l.name}</td>
                  <td className="px-4 py-3 text-slate-300">{l.description || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(l.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
