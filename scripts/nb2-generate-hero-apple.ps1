$ErrorActionPreference = 'Stop'

$repo = 'C:\Users\Claud\.openclaw\workspace\motion-ventures'
$nb2 = 'C:\Users\Claud\.openclaw\workspace\nano-banana-2-skill\src\cli.ts'
$keyPath = 'C:\Users\Claud\Desktop\keys\gemini-api.txt'
$outDir = Join-Path $repo 'nanobanana2-output'

$key = (Get-Content $keyPath -Raw).Trim()
if ([string]::IsNullOrWhiteSpace($key)) { throw "Key file empty: $keyPath" }

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
Set-Location $repo

$prompt = @'
Apple-advertisement style hero image for Motion Ventures (AI Studio for Automation).
Photorealistic premium 3D render.
Scene: minimal white cyclorama background (pure clean studio), subtle soft gradient, no patterns.
Subject: a single iconic workflow loop sculpture made of glass + brushed aluminum, like a continuous ribbon loop with embedded translucent segments, minimal, elegant.
Lighting: softbox key light + rim light, crisp specular highlights, soft shadow on ground, subtle prismatic edge refraction.
Composition: widescreen hero banner with lots of negative space on the left for headline and CTA overlay.
Constraints: no text, no logos, no people, no extra objects, not sci-fi, not cartoon.
'@

& node $nb2 $prompt --api-key $key -a '16:9' -s '2K' -m 'flash' -o 'mv-hero-apple-1' -d $outDir

Get-ChildItem $outDir -Filter 'mv-hero-apple-1.png' | Select-Object Name, Length, LastWriteTime
