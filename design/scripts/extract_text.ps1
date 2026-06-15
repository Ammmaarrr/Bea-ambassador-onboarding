# Extract text content by looking at uncompressed portions and object definitions
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$filePath = Join-Path $ProjectRoot "design\archive\Ambassador Onboarding.ai"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)

# Look for font descriptor objects with all their details
Write-Output "=== DETAILED FONT DESCRIPTORS ==="
$fontDescStart = 0
while ($true) {
    $idx = $text.IndexOf("/FontDescriptor", $fontDescStart)
    if ($idx -eq -1) { break }
    $start = [Math]::Max(0, $idx - 200)
    $length = [Math]::Min(600, $text.Length - $start)
    $snippet = $text.Substring($start, $length)
    $snippet = $snippet -replace '[\x00-\x08\x0E-\x1F]', ''
    Write-Output $snippet
    Write-Output "==="
    $fontDescStart = $idx + 20
}

# Look for the Illustrator AI-specific data (PostScript portion)
Write-Output ""
Write-Output "=== ILLUSTRATOR AI POSTSCRIPT DATA (searching for text commands) ==="
# In AI files, text is often set with commands like: (text string) Tj
# Let's find the AI private data section
$aiStart = $text.IndexOf("%%AI")
if ($aiStart -ge 0) {
    Write-Output "Found AI data at position $aiStart"
    $snippet = $text.Substring($aiStart, [Math]::Min(2000, $text.Length - $aiStart))
    Write-Output $snippet
}

# Look for illustrator-specific color operations  
Write-Output ""
Write-Output "=== AI COLOR OPERATIONS ==="
# AI uses operators like: R G B Xa (set fill color)
$colorOps = [regex]::Matches($text, '\d \d \d (?:Xa|XA)')
foreach ($m in $colorOps) {
    Write-Output $m.Value
}

# Find /ColorSpace entries
Write-Output ""
Write-Output "=== COLORSPACE DEFS ==="
$csMatches = [regex]::Matches($text, '/ColorSpace[^>]{1,200}')
$count = 0
foreach ($m in $csMatches) {
    if ($count -ge 20) { break }
    Write-Output $m.Value
    Write-Output "---"
    $count++
}

# Find ExtGState (opacity/transparency settings)
Write-Output ""
Write-Output "=== TRANSPARENCY/OPACITY STATES ==="
$gsMatches = [regex]::Matches($text, '/ExtGState[^>]{1,500}')
$count = 0
foreach ($m in $gsMatches) {
    if ($count -ge 10) { break }
    Write-Output $m.Value
    Write-Output "---"
    $count++
}

# Try to find uncompressed text content
Write-Output ""
Write-Output "=== SEARCHING FOR READABLE TEXT STRINGS ==="
# PDF text strings in parentheses
$textStrings = [regex]::Matches($text, '\((?:Welcome|Campus|Represent|Start|Already|Champion|Prizes|bea|National|Market)[^)]{0,100}\)')
foreach ($m in $textStrings) {
    Write-Output $m.Value
}

# Also look for hex-encoded text
$hexStrings = [regex]::Matches($text, '<[0-9A-Fa-f]{4,80}>')
$count = 0
foreach ($m in $hexStrings) {
    if ($count -ge 20) { break }
    Write-Output "Hex: $($m.Value)"
    $count++
}
