# Find fnm and set up Node.js
$fnmPaths = @(
    "$env:LOCALAPPDATA\Microsoft\WinGet\Links\fnm.exe",
    "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe\fnm.exe",
    "$env:USERPROFILE\.fnm\fnm.exe"
)

$fnm = $null
foreach ($p in $fnmPaths) {
    if (Test-Path $p) {
        $fnm = $p
        Write-Output "Found fnm at: $p"
        break
    }
}

if (-not $fnm) {
    # Search for it
    Write-Output "Searching for fnm.exe..."
    $found = Get-ChildItem -Path "$env:LOCALAPPDATA" -Filter "fnm.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $fnm = $found.FullName
        Write-Output "Found fnm at: $fnm"
    } else {
        Write-Output "fnm.exe not found anywhere!"
        exit 1
    }
}

# Install Node.js 22
Write-Output "Installing Node.js 22..."
& $fnm install 22

Write-Output "Using Node.js 22..."
& $fnm use 22

# Set up environment for fnm
Write-Output "Setting up fnm env..."
& $fnm env --use-on-cd | Out-String | Invoke-Expression

Write-Output "Node version:"
node --version
Write-Output "npm version:"
npm --version
