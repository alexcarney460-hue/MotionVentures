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
Minimal Apple-grade logomark for Motion Ventures.
Design: abstract M monogram formed from a single continuous loop ribbon (echo the workflow loop hero), geometric, balanced, premium.
Style: flat vector look, crisp edges, no gradients.
Color: near-black (#0B0F1A) on pure white background.
Constraints: no text, no shadows, no 3D, no mockups. Centered with generous padding.
'@

for ($i=1; $i -le 4; $i++) {
  $name = "mv-logo-mark-$i"
  Write-Host "Generating $name..."
  & node $nb2 $prompt --api-key $key -a '1:1' -s '1K' -m 'flash' -o $name -d $outDir
}

Get-ChildItem $outDir -Filter 'mv-logo-mark-*.png' | Select-Object Name, Length, LastWriteTime
