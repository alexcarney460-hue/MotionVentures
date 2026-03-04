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
Generate a cinematic macro nature frame for a premium AI studio website (Motion Ventures).
Visual idea: "intelligence from nature" — organic structures that feel like computation.
Style: dark Apple-event cinematic, near-black background, subtle neon accents (cyan/violet), high contrast, shallow depth of field, ultra-detailed macro photography look.
Subjects (vary across generations): mycelium networks, leaf veins, bioluminescent algae, crystalline minerals, water ripples with caustics, microscopic diatoms.
Composition: widescreen 16:9, center-weighted but with generous negative space for overlay text.
Constraints: no text, no logos, no people, no obvious animals, no cartoon look.
'@

# Generate 6 variations
for ($i=1; $i -le 6; $i++) {
  $name = "mv-macro-nature-$i"
  Write-Host "Generating $name..."
  & node $nb2 $prompt --api-key $key -a '16:9' -s '2K' -m 'flash' -o $name -d $outDir
}

Write-Host "Done. Outputs in: $outDir"
Get-ChildItem $outDir | Select-Object Name, Length, LastWriteTime
