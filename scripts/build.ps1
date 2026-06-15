# Production build for the Next.js app.
. "$PSScriptRoot\_env.ps1"
Use-Node

Set-Location $WebApp
Write-Output "Building apps/web ..."
npm run build
