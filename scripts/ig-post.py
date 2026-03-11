#!/usr/bin/env python3
"""
Motion Ventures — Instagram Direct Poster (via instagrapi)
Posts to Instagram using username/password (no Graph API needed).

Usage:
  py scripts/ig-post.py feed    --image URL --caption "text"
  py scripts/ig-post.py carousel --images URL1,URL2,URL3 --caption "text"
  py scripts/ig-post.py reel    --video URL --caption "text"

Env vars:
  IG_USERNAME  (default: motionventures_co)
  IG_PASSWORD  (required)
  IG_SESSION   (optional path to session cache JSON)

Returns JSON: {"ok": true, "media_id": "..."} or {"ok": false, "error": "..."}
"""

import sys
import os
import json
import tempfile
import argparse
from pathlib import Path
from urllib.request import urlretrieve

def get_client():
    from instagrapi import Client
    username = os.environ.get("IG_USERNAME", "motionventures_co")
    password = os.environ.get("IG_PASSWORD", "")
    session_path = os.environ.get("IG_SESSION", str(Path.home() / ".ig_session_mv.json"))

    if not password:
        return None, "IG_PASSWORD env var is required"

    cl = Client()

    # Try loading cached session first
    if os.path.exists(session_path):
        try:
            cl.load_settings(session_path)
            cl.login(username, password)
            cl.get_timeline_feed()  # verify session works
            return cl, None
        except Exception:
            pass  # fall through to fresh login

    try:
        cl.login(username, password)
        cl.dump_settings(session_path)
        return cl, None
    except Exception as e:
        return None, str(e)


def download_file(url, suffix=".jpg"):
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    urlretrieve(url, tmp.name)
    return tmp.name


def post_feed(cl, image_url, caption):
    path = download_file(image_url, ".jpg")
    try:
        media = cl.photo_upload(path, caption)
        return {"ok": True, "media_id": str(media.pk)}
    finally:
        os.unlink(path)


def post_carousel(cl, image_urls, caption):
    paths = []
    try:
        for url in image_urls:
            paths.append(download_file(url, ".jpg"))
        media = cl.album_upload(paths, caption)
        return {"ok": True, "media_id": str(media.pk)}
    finally:
        for p in paths:
            try:
                os.unlink(p)
            except Exception:
                pass


def post_reel(cl, video_url, caption):
    path = download_file(video_url, ".mp4")
    try:
        media = cl.clip_upload(path, caption)
        return {"ok": True, "media_id": str(media.pk)}
    finally:
        os.unlink(path)


def main():
    parser = argparse.ArgumentParser(description="Instagram Direct Poster")
    parser.add_argument("type", choices=["feed", "carousel", "reel"])
    parser.add_argument("--image", help="Image URL for feed post")
    parser.add_argument("--images", help="Comma-separated image URLs for carousel")
    parser.add_argument("--video", help="Video URL for reel")
    parser.add_argument("--caption", default="", help="Post caption")
    args = parser.parse_args()

    cl, err = get_client()
    if err:
        print(json.dumps({"ok": False, "error": err}))
        sys.exit(1)

    try:
        if args.type == "feed":
            if not args.image:
                print(json.dumps({"ok": False, "error": "feed requires --image"}))
                sys.exit(1)
            result = post_feed(cl, args.image, args.caption)
        elif args.type == "carousel":
            if not args.images:
                print(json.dumps({"ok": False, "error": "carousel requires --images"}))
                sys.exit(1)
            urls = [u.strip() for u in args.images.split(",") if u.strip()]
            result = post_carousel(cl, urls, args.caption)
        elif args.type == "reel":
            if not args.video:
                print(json.dumps({"ok": False, "error": "reel requires --video"}))
                sys.exit(1)
            result = post_reel(cl, args.video, args.caption)
        else:
            result = {"ok": False, "error": f"Unknown type: {args.type}"}

        print(json.dumps(result))
        sys.exit(0 if result.get("ok") else 1)
    except Exception as e:
        print(json.dumps({"ok": False, "error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
