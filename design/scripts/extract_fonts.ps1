# Extract font info from AI file XMP metadata
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$filePath = Join-Path $ProjectRoot "design\archive\Ambassador Onboarding.ai"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)

# Extract font references from XMP metadata
Write-Output "=== FONT REFERENCES IN XMP ==="
$fontPattern = '<stFnt[^>]*>[^<]*</stFnt[^>]*>'
$fontMatches = [regex]::Matches($text, 'stFnt:[a-zA-Z]+>[^<]+<')
foreach ($m in $fontMatches) {
    Write-Output $m.Value
}

Write-Output ""
Write-Output "=== FONT FAMILY REFERENCES ==="
$familyMatches = [regex]::Matches($text, 'fontFamily[^"]*"[^"]*"')
foreach ($m in $familyMatches) {
    Write-Output $m.Value
}

Write-Output ""
Write-Output "=== stFnt BLOCKS ==="
# Find stFnt font blocks
$start = 0
$count = 0
while ($start -lt $text.Length -and $count -lt 50) {
    $idx = $text.IndexOf("stFnt:", $start)
    if ($idx -eq -1) { break }
    $snippet = $text.Substring($idx, [Math]::Min(200, $text.Length - $idx))
    Write-Output "  Found at $idx : $snippet"
    Write-Output "---"
    $start = $idx + 10
    $count++
}

Write-Output ""
Write-Output "=== LOOKING FOR FONT NAMES ==="
$fontNames = [regex]::Matches($text, '(?:fontName|FontName|font-family)[^>]*>[^<]{1,100}')
foreach ($m in $fontNames) {
    Write-Output $m.Value
}

# Also search for common font name patterns
Write-Output ""
Write-Output "=== FONT TYPE PATTERNS ==="
$typePatterns = [regex]::Matches($text, '/(?:BaseFont|FontName)\s*/([^\s/\]]+)')
foreach ($m in $typePatterns) {
    Write-Output $m.Value
}
