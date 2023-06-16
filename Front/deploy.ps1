Clear-Host

$errorActionPreference = 'Stop'
$date = Get-Date -f "yyyyMMddHHmm"
$working = $PSScriptRoot
$jsonPath = "$working\public\data\config.json"
$targetBase = "D:\Web\esap\sirecec\v4"
$target = "$targetBase\deploy-dist"
$targetFinal = "$targetBase\deploy"
$targetBk = "$targetBase\_bk\sirecec-4-$date"
Write-Host "Fecha: $date"
Write-Host "Base: $targetBase"
Write-Host "Actual: $working"
Write-Host "Final: $target"
Write-Host "Backup: $targetBk"

if (Test-Path $targetBase) {
	Try {

		# Hace el backup del compilado actual
		if (Test-Path $targetFinal) {
			# if (-Not (Test-Path $targetBk)) {
			# 	New-Item -Path $targetBk -ItemType Directory
			# }
			# Crea el backup y limpia el directorio '.git'
			Copy-Item -Path $targetFinal -Destination $targetBk -Recurse -Force
			Remove-Item -LiteralPath "$targetBk\.git" -Force -Recurse
		}

		# 202305311259: Limpia directorio final excepto '.git'
		Get-ChildItem -Path "$targetFinal" -Recurse | Select -ExpandProperty FullName | Where { $_ -NotLike "$targetFinal\.git*" } | Sort Length -Descending | Remove-Item -Force

		# Compila Vue, mueve contenidos y elimina dist
		npm run build
		Move-Item "$working\dist\*" $target -Exclude $target -Force
		Remove-Item -LiteralPath "$working\dist" -Force -Recurse

		# Compila Dotnet
		# https://stackoverflow.com/a/56473932
		$Env:ASPNETCORE_CAPTURESTARTUPERRORS = "true"
		$Env:ASPNETCORE_DETAILEDERRORS = "true"
		cd ..\Api\
		dotnet clean
		dotnet publish -c Release -o "$target\api"

		# Mueve el compilado al directorio final manteniendo '.git'
		Get-ChildItem -Path "$target" -Recurse | Move-Item -Destination "$targetFinal"

		# Hace el commit
		Set-Location $targetFinal
		# git status
		git add .
		git commit -am "Actualización $date"
		git push
		git status

		# Abre el directorio
		Start-Process $targetFinal
		
		# Start-Process "chrome.exe" "http://esabogprusrcap2.esap.edu.int/sirecec4/inicio"
	}
 Catch {

		$ErrorMessage = $_.Exception.Message
		Write-Host "ERROR: $ErrorMessage" -ForegroundColor Red
		Break

	}
}




