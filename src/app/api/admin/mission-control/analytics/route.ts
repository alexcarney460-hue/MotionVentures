import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/admin/requireAdmin';

export async function GET(req: Request) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;

  const supabase = getSupabaseServer();
  if (!supabase)
    return NextResponse.json({ ok: false, error: 'Database unavailable' }, { status: 503 });

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();

  const [
    draftRes,
    approvedRes,
    postedRes,
    failedRes,
    postedTodayRes,
    postedWeekRes,
    agentLogsRes,
    contactsRes,
    scrapedContactsRes,
    companiesRes,
  ] = await Promise.all([
    supabase.from('marketing_content_queue').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('marketing_content_queue').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('marketing_content_queue').select('id', { count: 'exact', head: true }).eq('status', 'posted'),
    supabase.from('marketing_content_queue').select('id', { count: 'exact', head: true }).eq('status', 'failed'),
    supabase.from('marketing_content_queue').select('id', { count: 'exact', head: true }).eq('status', 'posted').gte('updated_at', todayStart),
    supabase.from('marketing_content_queue').select('id', { count: 'exact', head: true }).eq('status', 'posted').gte('updated_at', weekStart),
    supabase.from('agent_activity_log').select('*').order('created_at', { ascending: false }).limit(20),
    supabase.from('contacts').select('id', { count: 'exact', head: true }),
    supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('source', 'website_scrape'),
    supabase.from('companies').select('id', { count: 'exact', head: true }),
  ]);

  const draft = draftRes.count ?? 0;
  const approved = approvedRes.count ?? 0;
  const posted = postedRes.count ?? 0;
  const failed = failedRes.count ?? 0;
  const total = draft + approved + posted + failed;
  const approvalRate = total > 0 ? Math.round(((approved + posted) / total) * 100) : 0;

  return NextResponse.json({
    ok: true,
    data: {
      queue_stats: {
        draft,
        approved,
        posted,
        failed,
        total,
        approval_rate: approvalRate,
        posted_today: postedTodayRes.count ?? 0,
        posted_week: postedWeekRes.count ?? 0,
      },
      agent_logs: agentLogsRes.data ?? [],
      crm: {
        contacts: contactsRes.count ?? 0,
        companies: companiesRes.count ?? 0,
        scraped_contacts: scrapedContactsRes.count ?? 0,
      },
    },
  });
}
