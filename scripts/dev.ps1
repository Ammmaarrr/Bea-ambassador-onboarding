# Start the Next.js development server.
. "$PSScriptRoot\_env.ps1"
Use-Node

Set-Location $WebApp
Write-Output "Cleaning .next cache (fixes blank/unstyled pages on OneDrive)..."
npm run clean
Write-Output "Starting Next.js dev server at http://localhost:3000 ..."
npm run dev:fresh
