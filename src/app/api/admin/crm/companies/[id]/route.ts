import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/admin/requireAdmin';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;

  const supabase = getSupabaseServer();
  if (!supabase)
    return NextResponse.json({ ok: false, error: 'Database unavailable' }, { status: 503 });

  const { id } = await params;
  const [companyRes, contactsRes] = await Promise.all([
    supabase.from('companies').select('*').eq('id', id).single(),
    supabase.from('contacts').select('*').eq('company_id', id).order('created_at', { ascending: false }),
  ]);

  if (companyRes.error)
    return NextResponse.json({ ok: false, error: companyRes.error.message }, { status: 404 });

  return NextResponse.json({
    ok: true,
    data: { ...companyRes.data, contacts: contactsRes.data ?? [] },
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;

  const supabase = getSupabaseServer();
  if (!supabase)
    return NextResponse.json({ ok: false, error: 'Database unavailable' }, { status: 503 });

  const { id } = await params;
  const body = await req.json();
  const { data, error } = await supabase
    .from('companies')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true, data });
}
