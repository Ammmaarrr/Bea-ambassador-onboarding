# Deep extraction: find text rendering commands and font assignments in the AI/PDF
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$filePath = Join-Path $ProjectRoot "design\archive\Ambassador Onboarding.ai"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)

# Find all /F(n) font references and their Tf (text font) operator usages  
Write-Output "=== FONT RESOURCE MAPPINGS ==="
$fontResources = [regex]::Matches($text, '/F\d+\s+\d+ \d+ R')
$unique = @{}
foreach ($m in $fontResources) {
    $unique[$m.Value] = $true
}
foreach ($k in $unique.Keys | Sort-Object) {
    Write-Output $k
}

# Find BaseFont to Font ID mappings
Write-Output ""
Write-Output "=== BASEFONT MAPPINGS ==="
$baseFontMatches = [regex]::Matches($text, '/BaseFont/[^\s/\]>]+')
$unique2 = @{}
foreach ($m in $baseFontMatches) {
    $unique2[$m.Value] = $true
}
foreach ($k in $unique2.Keys | Sort-Object) {
    Write-Output $k
}

# Search for text positioning operators near font switches
# Look for Tf (font setting) and Tj/TJ (text showing) patterns
Write-Output ""
Write-Output "=== TEXT RENDERING OPERATIONS (first 80) ==="
$textOps = [regex]::Matches($text, '/[A-Z]\d+ \d+\.?\d* Tf[^T]{0,300}T[jJ]')
$count = 0
foreach ($m in $textOps) {
    if ($count -ge 80) { break }
    $val = $m.Value -replace '[\r\n]+', ' '
    if ($val.Length -gt 200) { $val = $val.Substring(0, 200) + "..." }
    Write-Output "[$count] $val"
    Write-Output "---"
    $count++
}

# Extract actual color state operations (rg = set RGB fill, RG = set RGB stroke)
Write-Output ""
Write-Output "=== FILL COLOR OPERATIONS (rg - first 50) ==="
$rgOps = [regex]::Matches($text, '\d+\.?\d* \d+\.?\d* \d+\.?\d* rg')
$uniqueRG = @{}
foreach ($m in $rgOps) {
    $uniqueRG[$m.Value] = $true
}
$count = 0
foreach ($k in $uniqueRG.Keys) {
    if ($count -ge 50) { break }
    Write-Output $k
    $count++
}

# Specifically look for the background color of the page
Write-Output ""
Write-Output "=== LOOKING FOR SPECIFIC DESIGN COLORS ==="
# Search for cream/beige background colors
$bgMatches = [regex]::Matches($text, '0\.9\d+ 0\.9\d+ 0\.\d+ rg')
foreach ($m in $bgMatches) {
    Write-Output "Possible bg: $($m.Value)"
}

# Search for text matrices that contain scaling (font size)
Write-Output ""
Write-Output "=== TEXT MATRICES (Tm) with sizes ==="
$tmOps = [regex]::Matches($text, '[\d.]+ 0 0 [\d.]+ [\d.]+ [\d.]+ Tm')
$uniqueTm = @{}
foreach ($m in $tmOps) {
    # Extract the font size (first number = horizontal scale)
    $parts = $m.Value -split '\s+'
    $size = $parts[0]
    $uniqueTm[$size] = $m.Value
}
foreach ($k in $uniqueTm.Keys | Sort-Object { [float]$_ }) {
    Write-Output "Size $k : $($uniqueTm[$k])"
}
