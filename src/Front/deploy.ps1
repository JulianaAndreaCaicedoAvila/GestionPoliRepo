Clear-Host

$errorActionPreference = 'Stop'
$date = Get-Date -f "yyyyMMddHHmm"
$working = $PSScriptRoot
$jsonPath = "$working\public\data\config.json"
$targetBase = "D:\Web\esap\sirecec\v4\app\_Deploy"
$target = "$targetBase\sirecec4"
$targetBk = "$targetBase\_bk\pnsv-$date"
Write-Host "Fecha: $date"
Write-Host "Base: $targetBase"
Write-Host "Actual: $working"
Write-Host "Final: $target"
Write-Host "Backup: $targetBk"

if (Test-Path $targetBase) {
	Try {

		# Renombra (Mueve) si existe
		if (Test-Path $target) {
			# Rename-Item $target $targetBk
			# Move a directory and its contents to another directory => https://t.ly/juv5
			Move-Item -Path $target -Destination $targetBk
		}

		# Compila y mueve
		Set-Location $working
		npm run build
		Move-Item -Path "$working\dist" -Destination $target

		# Compila Dotnet
		cd ..\Api\
		dotnet clean
		dotnet publish -c Release -o "$target\api"

		# Lanza
		Start-Process $target
		Start-Process "chrome.exe" "https://support.nemedi.com/esap/sirecec4"

	}
 Catch {

		$ErrorMessage = $_.Exception.Message
		Write-Host "ERROR: $ErrorMessage" -ForegroundColor Red
		Break

	}
}




