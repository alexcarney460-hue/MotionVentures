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
Open Graph social preview image for Motion Ventures (AI studio).
Style: light premium high-tech minimal; white/pearl gradient; subtle glassmorphism; faint holographic grid; gentle cyan + violet edge glow.
Composition: 1200x630 safe; one focal 3D glass element slightly left-of-center; lots of negative space; avoid edges; soft shadows.
Constraints: no text, no logos, no people.
'@

& node $nb2 $prompt --api-key $key -a '16:9' -s '1K' -m 'flash' -o 'mv-og-1' -d $outDir

Get-ChildItem $outDir -Filter 'mv-og-1.png' | Select-Object Name, Length, LastWriteTime
