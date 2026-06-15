# Shared environment bootstrap for project scripts.
$script:ProjectRoot = Split-Path $PSScriptRoot -Parent
$script:WebApp = Join-Path $ProjectRoot "apps\web"
$script:Fnm = "C:\Users\hamza\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe\fnm.exe"

function Use-Node {
    if (Test-Path $Fnm) {
        & $Fnm env --use-on-cd | Out-String | Invoke-Expression
    }
}
