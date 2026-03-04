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
Apple-event style dark dramatic hero image for Motion Ventures (AI Studio for Automation).
Photorealistic premium 3D render.
Scene: deep charcoal to black cyclorama studio background with subtle vignette, no patterns.
Subject: a single iconic workflow loop sculpture made of glass + brushed aluminum, elegant and minimal.
Lighting: strong rim light and soft key light, high contrast, crisp specular highlights, subtle prismatic refraction, soft shadow.
Composition: widescreen banner with generous negative space on the left for headline/CTA overlay.
Constraints: no text, no logos, no people, no extra objects, not cyberpunk, not neon overload.
'@

for ($i=1; $i -le 3; $i++) {
  $name = "mv-hero-apple-dark-$i"
  Write-Host "Generating $name..."
  & node $nb2 $prompt --api-key $key -a '16:9' -s '2K' -m 'flash' -o $name -d $outDir
}

Get-ChildItem $outDir -Filter 'mv-hero-apple-dark-*.png' | Select-Object Name, Length, LastWriteTime
