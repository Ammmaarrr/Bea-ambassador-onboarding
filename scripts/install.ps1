# Install Node dependencies for apps/web.
. "$PSScriptRoot\_env.ps1"
Use-Node

Write-Output "Node: $(node --version)"
Write-Output "npm: $(npm --version)"

Set-Location $WebApp
Write-Output "Installing apps/web dependencies ..."
npm install
