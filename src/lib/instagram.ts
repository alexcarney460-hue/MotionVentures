const GRAPH_URL = 'https://graph.facebook.com/v21.0';

function getCredentials() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
  if (!token || !accountId) return null;
  return { token, accountId };
}

type PublishResult =
  | { ok: true; igMediaId: string }
  | { ok: false; error: string };

export async function publishFeedPost(
  imageUrl: string,
  caption: string,
): Promise<PublishResult> {
  const creds = getCredentials();
  if (!creds) return { ok: false, error: 'Missing Instagram credentials' };

  // Step 1: Create media container
  const createRes = await fetch(
    `${GRAPH_URL}/${creds.accountId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        caption,
        access_token: creds.token,
      }),
    },
  );
  const createData = await createRes.json();
  if (!createData.id) return { ok: false, error: createData.error?.message || 'Container creation failed' };

  // Step 2: Publish
  const pubRes = await fetch(
    `${GRAPH_URL}/${creds.accountId}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: createData.id,
        access_token: creds.token,
      }),
    },
  );
  const pubData = await pubRes.json();
  if (!pubData.id) return { ok: false, error: pubData.error?.message || 'Publish failed' };

  return { ok: true, igMediaId: pubData.id };
}

export async function publishCarousel(
  imageUrls: string[],
  caption: string,
): Promise<PublishResult> {
  const creds = getCredentials();
  if (!creds) return { ok: false, error: 'Missing Instagram credentials' };

  // Create individual containers
  const containerIds: string[] = [];
  for (const url of imageUrls) {
    const res = await fetch(`${GRAPH_URL}/${creds.accountId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: url,
        is_carousel_item: true,
        access_token: creds.token,
      }),
    });
    const data = await res.json();
    if (!data.id) return { ok: false, error: data.error?.message || 'Carousel item failed' };
    containerIds.push(data.id);
  }

  // Create carousel container
  const carouselRes = await fetch(`${GRAPH_URL}/${creds.accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      media_type: 'CAROUSEL',
      children: containerIds.join(','),
      caption,
      access_token: creds.token,
    }),
  });
  const carouselData = await carouselRes.json();
  if (!carouselData.id) return { ok: false, error: carouselData.error?.message || 'Carousel container failed' };

  // Publish
  const pubRes = await fetch(`${GRAPH_URL}/${creds.accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creation_id: carouselData.id,
      access_token: creds.token,
    }),
  });
  const pubData = await pubRes.json();
  if (!pubData.id) return { ok: false, error: pubData.error?.message || 'Carousel publish failed' };

  return { ok: true, igMediaId: pubData.id };
}

export async function publishReel(
  videoUrl: string,
  caption: string,
  coverUrl?: string,
): Promise<PublishResult> {
  const creds = getCredentials();
  if (!creds) return { ok: false, error: 'Missing Instagram credentials' };

  const body: Record<string, string> = {
    media_type: 'REELS',
    video_url: videoUrl,
    caption,
    access_token: creds.token,
  };
  if (coverUrl) body.cover_url = coverUrl;

  const createRes = await fetch(`${GRAPH_URL}/${creds.accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const createData = await createRes.json();
  if (!createData.id) return { ok: false, error: createData.error?.message || 'Reel container failed' };

  // Wait for processing
  await new Promise((r) => setTimeout(r, 5000));

  const pubRes = await fetch(`${GRAPH_URL}/${creds.accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creation_id: createData.id,
      access_token: creds.token,
    }),
  });
  const pubData = await pubRes.json();
  if (!pubData.id) return { ok: false, error: pubData.error?.message || 'Reel publish failed' };

  return { ok: true, igMediaId: pubData.id };
}
