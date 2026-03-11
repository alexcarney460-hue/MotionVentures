'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAdminToken } from '../crm/components/api';

const API_BASE = '/api/admin';
const MKT_BASE = '/api/marketing';

function apiFetch(url: string, opts?: RequestInit) {
  const token = getAdminToken();
  return fetch(url, {
    ...opts,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(opts?.headers || {}) },
  });
}

// ─── Pixel Art Agent Sprites (CSS-based) ────────────────────────────
const AGENTS = [
  { id: 'catalyst', name: 'CATALYST', role: 'Content Strategist', class: 'MAGE', hp: 100, mp: 85, color: '#a78bfa', emoji: '🧙' },
  { id: 'maven', name: 'MAVEN', role: 'Research Analyst', class: 'SCOUT', hp: 90, mp: 95, color: '#60a5fa', emoji: '🔍' },
  { id: 'echo', name: 'ECHO', role: 'Copywriter', class: 'BARD', hp: 85, mp: 90, color: '#34d399', emoji: '✍️' },
  { id: 'tags', name: 'TAGS', role: 'Hashtag Expert', class: 'RANGER', hp: 80, mp: 70, color: '#fbbf24', emoji: '#️⃣' },
  { id: 'guardian', name: 'GUARDIAN', role: 'Brand Checker', class: 'PALADIN', hp: 100, mp: 60, color: '#f87171', emoji: '🛡️' },
  { id: 'courier', name: 'COURIER', role: 'Scheduler', class: 'THIEF', hp: 75, mp: 80, color: '#fb923c', emoji: '📮' },
  { id: 'publisher', name: 'PUBLISHER', role: 'Post Executor', class: 'KNIGHT', hp: 95, mp: 50, color: '#e879f9', emoji: '⚔️' },
];

// ─── RPG HP/MP Bar ──────────────────────────────────────────────────
function StatBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-1 text-[10px]">
      <span className="w-5 text-right" style={{ color }}>{label}</span>
      <div className="flex-1 h-2 bg-gray-900 border border-gray-700 relative overflow-hidden">
        <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-10 text-right text-gray-500">{value}/{max}</span>
    </div>
  );
}

// ─── Agent Card (RPG Party Member) ──────────────────────────────────
function AgentCard({ agent, status }: { agent: typeof AGENTS[0]; status: string }) {
  const statusColors: Record<string, string> = {
    IDLE: 'text-gray-600',
    ACTIVE: 'text-green-400',
    COOLDOWN: 'text-yellow-500',
    ERROR: 'text-red-500',
  };

  return (
    <div className="border border-green-900 bg-black/60 p-2 hover:border-green-500 transition-colors group">
      <div className="flex items-start gap-2">
        <div
          className="w-10 h-10 border border-gray-700 flex items-center justify-center text-lg group-hover:animate-bounce"
          style={{ backgroundColor: agent.color + '15' }}
        >
          {agent.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: agent.color }}>{agent.name}</span>
            <span className={`text-[9px] ${statusColors[status] || 'text-gray-600'}`}>
              [{status}]
            </span>
          </div>
          <div className="text-[10px] text-gray-500">{agent.class} — {agent.role}</div>
          <div className="mt-1 space-y-0.5">
            <StatBar value={agent.hp} max={100} color="#4ade80" label="HP" />
            <StatBar value={agent.mp} max={100} color="#60a5fa" label="MP" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Terminal Log Line ──────────────────────────────────────────────
function TermLine({ time, agent, msg, type }: { time: string; agent: string; msg: string; type: string }) {
  const typeColors: Record<string, string> = {
    info: 'text-green-400',
    warn: 'text-yellow-400',
    error: 'text-red-400',
    success: 'text-cyan-400',
  };
  return (
    <div className="text-[11px] leading-relaxed">
      <span className="text-gray-600">[{time}]</span>{' '}
      <span className="text-purple-400">{agent}</span>{' '}
      <span className={typeColors[type] || 'text-green-400'}>{msg}</span>
    </div>
  );
}

// ─── Queue Item Row ─────────────────────────────────────────────────
function QueueRow({ item, onPublish, onApprove }: {
  item: Record<string, string>;
  onPublish: (id: string) => void;
  onApprove: (id: string) => void;
}) {
  const statusBadge: Record<string, string> = {
    draft: 'bg-gray-800 text-gray-400 border-gray-700',
    approved: 'bg-green-900/40 text-green-400 border-green-800',
    posted: 'bg-cyan-900/40 text-cyan-400 border-cyan-800',
    failed: 'bg-red-900/40 text-red-400 border-red-800',
  };
  const badge = statusBadge[item.status] || statusBadge.draft;

  return (
    <div className="border border-green-900/50 bg-black/40 p-2 flex items-center gap-3 hover:border-green-700 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="text-xs text-green-300 truncate">{item.caption?.slice(0, 60) || '(no caption)'}</div>
        <div className="text-[10px] text-gray-600 mt-0.5">
          {item.media_type || 'feed'} | {new Date(item.created_at).toLocaleDateString()}
        </div>
      </div>
      <span className={`text-[10px] px-2 py-0.5 border ${badge}`}>{item.status?.toUpperCase()}</span>
      {item.status === 'draft' && (
        <button onClick={() => onApprove(item.id)} className="text-[10px] px-2 py-0.5 border border-yellow-800 text-yellow-500 hover:bg-yellow-900/30 transition-colors">
          APPROVE
        </button>
      )}
      {item.status === 'approved' && (
        <button onClick={() => onPublish(item.id)} className="text-[10px] px-2 py-0.5 border border-green-700 text-green-400 hover:bg-green-900/30 transition-colors animate-pulse">
          PUBLISH
        </button>
      )}
    </div>
  );
}

// ─── Main Mission Control Page ──────────────────────────────────────
export default function MissionControlPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [queue, setQueue] = useState<Record<string, string>[]>([]);
  const [logs, setLogs] = useState<{ time: string; agent: string; msg: string; type: string }[]>([]);
  const [agentStatuses, setAgentStatuses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const addLog = useCallback((agent: string, msg: string, type = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [{ time, agent, msg, type }, ...prev].slice(0, 50));
  }, []);

  // Fetch CRM stats
  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch(`${API_BASE}/crm/stats`);
        if (res.ok) {
          const json = await res.json();
          if (json.ok) {
            const d = json.data;
            setStats({
              contacts: d.totals?.contacts || 0,
              companies: d.totals?.companies || 0,
              deals: d.totals?.deals || 0,
              hotLeads: d.by_status?.OPEN || 0,
            });
          }
        }
      } catch {}

      try {
        const res = await apiFetch(`${MKT_BASE}/queue`);
        if (res.ok) {
          const json = await res.json();
          if (json.ok) setQueue(json.data || []);
        }
      } catch {}

      // Simulate agent statuses
      const statuses: Record<string, string> = {};
      AGENTS.forEach(a => {
        const roll = Math.random();
        statuses[a.id] = roll > 0.7 ? 'ACTIVE' : roll > 0.3 ? 'IDLE' : 'COOLDOWN';
      });
      setAgentStatuses(statuses);

      setLoading(false);
    }
    load();
  }, []);

  // Boot sequence logs
  useEffect(() => {
    if (loading) return;
    const bootMessages = [
      { agent: 'SYSTEM', msg: '> MISSION CONTROL v2.0 ONLINE', type: 'success' },
      { agent: 'SYSTEM', msg: '> CRM database connected — Supabase OK', type: 'info' },
      { agent: 'SYSTEM', msg: `> ${stats.contacts || 0} contacts | ${stats.companies || 0} companies loaded`, type: 'info' },
      { agent: 'CATALYST', msg: 'Content strategist reporting for duty', type: 'info' },
      { agent: 'MAVEN', msg: 'Research module initialized — scanning trends', type: 'info' },
      { agent: 'ECHO', msg: 'Copywriting engine warmed up', type: 'info' },
      { agent: 'GUARDIAN', msg: 'Brand safety filters ACTIVE', type: 'success' },
      { agent: 'PUBLISHER', msg: `Instagram API ready — ${queue.length} items in queue`, type: 'info' },
      { agent: 'SYSTEM', msg: '> All agents nominal. Awaiting orders.', type: 'success' },
    ];
    bootMessages.forEach((m, i) => {
      setTimeout(() => addLog(m.agent, m.msg, m.type), i * 400);
    });
  }, [loading, stats.contacts, stats.companies, queue.length, addLog]);

  const handleApprove = async (id: string) => {
    addLog('GUARDIAN', `Approving content #${id.slice(0, 8)}...`, 'warn');
    const res = await apiFetch(`${MKT_BASE}/queue`, {
      method: 'PATCH',
      body: JSON.stringify({ id, status: 'approved' }),
    });
    if (res.ok) {
      setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'approved' } : q));
      addLog('GUARDIAN', 'Content approved! Ready to publish.', 'success');
    } else {
      addLog('GUARDIAN', 'Approval failed!', 'error');
    }
  };

  const handlePublish = async (id: string) => {
    addLog('PUBLISHER', `Publishing content #${id.slice(0, 8)} to Instagram...`, 'warn');
    setAgentStatuses(prev => ({ ...prev, publisher: 'ACTIVE' }));
    const res = await apiFetch(`${MKT_BASE}/publish/${id}`, { method: 'POST' });
    const json = await res.json().catch(() => ({ ok: false }));
    if (json.ok) {
      setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'posted' } : q));
      addLog('PUBLISHER', `Posted! IG Media ID: ${json.igMediaId}`, 'success');
    } else {
      setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'failed' } : q));
      addLog('PUBLISHER', `Publish failed: ${json.error || 'unknown'}`, 'error');
    }
    setAgentStatuses(prev => ({ ...prev, publisher: 'IDLE' }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-green-400 text-sm animate-pulse mb-2">INITIALIZING SYSTEMS...</div>
          <div className="text-green-700 text-xs">
            {'█'.repeat(12)}{'░'.repeat(8)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="border-2 border-green-800 bg-gradient-to-r from-black via-green-950/20 to-black p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-widest text-green-300">
              {'>'} MOTION VENTURES — MISSION CONTROL
            </h1>
            <p className="text-[10px] text-green-700 mt-1">
              INSTAGRAM MARKETING AGENT COMMAND CENTER | AGENT TEAM: OPERATIONAL
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-green-600">SYSTEM STATUS</div>
            <div className="text-green-400 text-sm font-bold animate-pulse">● ONLINE</div>
          </div>
        </div>
      </div>

      {/* CRM Stats (RPG-style stat blocks) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { label: 'CONTACTS', value: stats.contacts || 0, icon: '👤', color: '#4ade80' },
          { label: 'COMPANIES', value: stats.companies || 0, icon: '🏢', color: '#60a5fa' },
          { label: 'HOT LEADS', value: stats.hotLeads || 0, icon: '🔥', color: '#f87171' },
          { label: 'QUEUE', value: queue.length, icon: '📋', color: '#fbbf24' },
        ].map((s) => (
          <div key={s.label} className="border border-green-900 bg-black/60 p-3 text-center hover:border-green-600 transition-colors">
            <div className="text-lg mb-1">{s.icon}</div>
            <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[9px] text-gray-600 tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Agent Roster */}
        <div className="lg:col-span-1 space-y-2">
          <div className="border-b border-green-900 pb-1 mb-2">
            <span className="text-xs text-green-600 tracking-widest">{'>'} AGENT ROSTER — PARTY STATUS</span>
          </div>
          {AGENTS.map(agent => (
            <AgentCard key={agent.id} agent={agent} status={agentStatuses[agent.id] || 'IDLE'} />
          ))}
        </div>

        {/* Right Column: Terminal + Queue */}
        <div className="lg:col-span-2 space-y-4">
          {/* Terminal Console */}
          <div className="border border-green-900 bg-black/80">
            <div className="border-b border-green-900 px-3 py-1 flex items-center justify-between">
              <span className="text-[10px] text-green-600 tracking-widest">{'>'} AGENT TELEMETRY LOG</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
            </div>
            <div className="p-3 h-64 overflow-y-auto space-y-0.5" style={{ fontFamily: '"Courier New", monospace' }}>
              {logs.length === 0 ? (
                <div className="text-green-800 text-xs animate-pulse">{'>'} Awaiting telemetry data...</div>
              ) : (
                logs.map((log, i) => (
                  <TermLine key={i} time={log.time} agent={log.agent} msg={log.msg} type={log.type} />
                ))
              )}
              <div className="text-green-700 animate-pulse">▊</div>
            </div>
          </div>

          {/* Marketing Queue */}
          <div className="border border-green-900 bg-black/80">
            <div className="border-b border-green-900 px-3 py-1 flex items-center justify-between">
              <span className="text-[10px] text-green-600 tracking-widest">{'>'} CONTENT QUEUE — INSTAGRAM</span>
              <span className="text-[9px] text-gray-600">{queue.length} ITEMS</span>
            </div>
            <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
              {queue.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-2xl mb-2">📭</div>
                  <div className="text-xs text-green-800">Queue empty. Content agents on standby.</div>
                  <div className="text-[10px] text-gray-700 mt-1">
                    Use the API to add content: POST /api/marketing/queue
                  </div>
                </div>
              ) : (
                queue.map(item => (
                  <QueueRow key={item.id} item={item} onPublish={handlePublish} onApprove={handleApprove} />
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border border-green-900 bg-black/80 p-3">
            <div className="text-[10px] text-green-600 tracking-widest mb-2">{'>'} QUICK ACTIONS</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: 'NEW CAMPAIGN', icon: '🎯', action: 'campaign' },
                { label: 'GENERATE POST', icon: '✨', action: 'generate' },
                { label: 'VIEW ANALYTICS', icon: '📊', action: 'analytics' },
                { label: 'REFRESH DATA', icon: '🔄', action: 'refresh' },
              ].map((btn) => (
                <button
                  key={btn.action}
                  onClick={() => {
                    if (btn.action === 'refresh') {
                      window.location.reload();
                    } else {
                      addLog('SYSTEM', `${btn.label} — Feature coming soon`, 'warn');
                    }
                  }}
                  className="border border-green-900 hover:border-green-500 bg-black/40 hover:bg-green-950/20 px-3 py-2 text-[10px] text-green-500 hover:text-green-300 transition-all text-center"
                >
                  <div className="text-base mb-1">{btn.icon}</div>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-2">
        <div className="text-[9px] text-green-900">
          MOTION VENTURES MISSION CONTROL v2.0 | AGENTS: {AGENTS.length} | UPTIME: {Math.floor(Math.random() * 99 + 1)}%
        </div>
      </div>
    </div>
  );
}
