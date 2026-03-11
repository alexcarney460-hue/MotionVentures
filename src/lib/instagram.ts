import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execFileAsync = promisify(execFile);

type PublishResult =
  | { ok: true; igMediaId: string }
  | { ok: false; error: string };

const SCRIPT_PATH = path.resolve(process.cwd(), 'scripts', 'ig-post.py');
const PY_CMD = process.platform === 'win32' ? 'py' : 'python3';

async function runIgPost(args: string[]): Promise<PublishResult> {
  const password = process.env.IG_PASSWORD;
  if (!password) return { ok: false, error: 'IG_PASSWORD env var not set' };

  try {
    const { stdout } = await execFileAsync(PY_CMD, [SCRIPT_PATH, ...args], {
      env: {
        ...process.env,
        IG_USERNAME: process.env.IG_USERNAME || 'motionventures_co',
        IG_PASSWORD: password,
      },
      timeout: 120_000,
    });

    const result = JSON.parse(stdout.trim());
    if (result.ok) {
      return { ok: true, igMediaId: result.media_id };
    }
    return { ok: false, error: result.error || 'Unknown error' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // Try to parse stderr/stdout for JSON error
    if (typeof (err as { stdout?: string }).stdout === 'string') {
      try {
        const parsed = JSON.parse((err as { stdout: string }).stdout.trim());
        return { ok: false, error: parsed.error || msg };
      } catch {}
    }
    return { ok: false, error: msg };
  }
}

export async function publishFeedPost(
  imageUrl: string,
  caption: string,
): Promise<PublishResult> {
  return runIgPost(['feed', '--image', imageUrl, '--caption', caption]);
}

export async function publishCarousel(
  imageUrls: string[],
  caption: string,
): Promise<PublishResult> {
  return runIgPost(['carousel', '--images', imageUrls.join(','), '--caption', caption]);
}

export async function publishReel(
  videoUrl: string,
  caption: string,
  _coverUrl?: string,
): Promise<PublishResult> {
  return runIgPost(['reel', '--video', videoUrl, '--caption', caption]);
}
