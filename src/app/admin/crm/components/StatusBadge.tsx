'use client';

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500/20 text-blue-400',
  OPEN: 'bg-emerald-500/20 text-emerald-400',
  CONTACTED: 'bg-amber-500/20 text-amber-400',
  ATTEMPTED_TO_CONTACT: 'bg-orange-500/20 text-orange-400',
  CONNECTED: 'bg-green-500/20 text-green-400',
  BAD_TIMING: 'bg-slate-500/20 text-slate-400',
  UNQUALIFIED: 'bg-red-500/20 text-red-400',
};

export default function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || 'bg-slate-500/20 text-slate-400';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
