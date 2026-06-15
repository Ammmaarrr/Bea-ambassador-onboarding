# Extract color swatches and other design data from AI file
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$filePath = Join-Path $ProjectRoot "design\archive\Ambassador Onboarding.ai"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)

# Find color swatches in XMP
Write-Output "=== COLOR SWATCHES (xmpG) ==="
$colorMatches = [regex]::Matches($text, 'xmpG:sw[^/]{0,500}')
$count = 0
foreach ($m in $colorMatches) {
    if ($count -ge 30) { break }
    Write-Output $m.Value
    Write-Output "---"
    $count++
}

Write-Output ""
Write-Output "=== SWATCH NAMES ==="
$swatchNames = [regex]::Matches($text, 'xmpG:swatchName[^"]*"[^"]*"')
foreach ($m in $swatchNames) {
    Write-Output $m.Value
}

Write-Output ""
Write-Output "=== RGB COLOR VALUES ==="
$rgbMatches = [regex]::Matches($text, 'xmpG:(?:red|green|blue)[^"]*"[^"]*"')
foreach ($m in $rgbMatches) {
    Write-Output $m.Value
}

Write-Output ""
Write-Output "=== COLOR SPACES ==="
$csMatches = [regex]::Matches($text, 'xmpG:(?:mode|type)[^"]*"[^"]*"')
foreach ($m in $csMatches) {
    Write-Output $m.Value
}

Write-Output ""
Write-Output "=== LOOKING FOR HEX COLORS ==="
$hexMatches = [regex]::Matches($text, '#[0-9a-fA-F]{6}')
$uniqueColors = @{}
foreach ($m in $hexMatches) {
    $uniqueColors[$m.Value] = $true
}
foreach ($c in $uniqueColors.Keys) {
    Write-Output $c
}

Write-Output ""
Write-Output "=== PAGE DIMENSIONS ==="
$dimMatches = [regex]::Matches($text, 'stDim:[^"]*"[^"]*"')
foreach ($m in $dimMatches) {
    Write-Output $m.Value
}

Write-Output ""
Write-Output "=== ARTBOARD INFO ==="
$artboardMatches = [regex]::Matches($text, '/MediaBox[^]]*]')
foreach ($m in $artboardMatches) {
    Write-Output $m.Value
}

Write-Output ""
Write-Output "=== FONT SIZE REFERENCES ==="
$fontSizeMatches = [regex]::Matches($text, '\d+\.?\d* Tf')
$uniqueSizes = @{}
foreach ($m in $fontSizeMatches) {
    $uniqueSizes[$m.Value] = $true
}
foreach ($s in $uniqueSizes.Keys | Sort-Object) {
    Write-Output $s
}
