import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { publishFeedPost, publishCarousel, publishReel } from '@/lib/instagram';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authErr = requireAdmin(req);
  if (authErr) return authErr;

  const { id } = await params;
  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ ok: false, error: 'DB unavailable' }, { status: 503 });

  const { data: item, error: fetchErr } = await supabase
    .from('marketing_content_queue')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchErr || !item) {
    return NextResponse.json({ ok: false, error: 'Queue item not found' }, { status: 404 });
  }

  if (item.status === 'posted') {
    return NextResponse.json({ ok: false, error: 'Already published' }, { status: 400 });
  }

  const mediaType = item.media_type || 'feed';
  const caption = item.caption || '';
  const imageUrl = item.image_url || '';
  const imageUrls: string[] = item.image_urls || [];
  const videoUrl = item.video_url || '';
  const coverUrl = item.cover_url || '';

  let result;
  if (mediaType === 'carousel' && imageUrls.length > 0) {
    result = await publishCarousel(imageUrls, caption);
  } else if (mediaType === 'reel' && videoUrl) {
    result = await publishReel(videoUrl, caption, coverUrl || undefined);
  } else if (imageUrl) {
    result = await publishFeedPost(imageUrl, caption);
  } else {
    return NextResponse.json({ ok: false, error: 'No media URL provided' }, { status: 400 });
  }

  if (!result.ok) {
    await supabase
      .from('marketing_content_queue')
      .update({ status: 'failed', error_message: result.error, updated_at: new Date().toISOString() })
      .eq('id', id);
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  await supabase
    .from('marketing_content_queue')
    .update({
      status: 'posted',
      ig_media_id: result.igMediaId,
      posted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  return NextResponse.json({ ok: true, igMediaId: result.igMediaId });
}
