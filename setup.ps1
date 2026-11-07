# Windows entry point. All logic lives in scripts/setup.mjs (shared with ./setup).
# Usage: .\setup.ps1 [--e2e]
$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error 'Node.js is required (see .nvmrc).'
    exit 1
}
& node scripts/setup.mjs @args
exit $LASTEXITCODE
