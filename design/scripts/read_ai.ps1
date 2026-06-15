$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$filePath = Join-Path $ProjectRoot "design\archive\Ambassador Onboarding.ai"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$header = [System.Text.Encoding]::ASCII.GetString($bytes, 0, 4000)
Write-Output "=== HEADER ==="
Write-Output $header
Write-Output ""
Write-Output "=== FILE SIZE ==="
Write-Output "$($bytes.Length) bytes"
