$ErrorActionPreference = 'Stop'

$repo = 'C:\Users\Claud\.openclaw\workspace\motion-ventures'
$nb2 = 'C:\Users\Claud\.openclaw\workspace\nano-banana-2-skill\src\cli.ts'
$keyPath = 'C:\Users\Claud\Desktop\keys\gemini-api.txt'
$outDir = Join-Path $repo 'nanobanana2-output'

if (!(Test-Path $keyPath)) { throw "Missing key file: $keyPath" }
$key = (Get-Content $keyPath -Raw).Trim()
if ([string]::IsNullOrWhiteSpace($key)) { throw "Key file empty: $keyPath" }

New-Item -ItemType Directory -Force -Path $outDir | Out-Null
Set-Location $repo

$prompt = @'
Premium studio homepage hero background for Motion Ventures.
Style: light, high-tech, welcoming, minimal luxury.
Scene: abstract 3D, soft white/pearl gradient, subtle glassmorphism panels, faint holographic grid, floating translucent shapes, gentle cyan+violet edge glow, soft shadows.
Composition: wide banner with lots of negative space for headline overlay.
Constraints: no text, no logos, no people.
'@

# Generate 3 variations (separate outputs)
for ($i=1; $i -le 3; $i++) {
  $name = "mv-hero-$i"
  Write-Host "Generating $name..."
  & node $nb2 $prompt --api-key $key -a '16:9' -s '2K' -m 'flash' -o $name -d $outDir
}

Write-Host "Done. Outputs in: $outDir"
Get-ChildItem $outDir | Select-Object Name, Length, LastWriteTime
