# .\deploy.ps1 -> test
# .\deploy.ps1 master -> producción

# 202402200241: Objetivo test o prod modifica js
Clear-Host

#Aplicacion
$pause = 0
$env = $args[0]
$deployPath = "/";
if (!$args[0]) {
	$env = "test"
	$deployPath = "/sirecec4/";
}
$pauseMsg = "Presione un tecla para continuar"

$errorActionPreference = 'Stop'
$date = Get-Date -f "yyyyMMddHHmm"
$baseDir = "D:\web\esap\v4"
$frontDir = "$baseDir\app\Front"
$tempDir = "$baseDir\deploy-dist"
$finalDir = "$baseDir\deploy"
$backupDir = "$baseDir\_bk\sirecec-4-$date"
$configFile = "$baseDir\app\Front\public\data\config.json"
$viteFile = "$frontDir\vite.config.js"

Write-Host "Ambiente: $env"
Write-Host "DeployPath: $deployPath"
Write-Host "Fecha: $date"
Write-Host "Base: $baseDir"
Write-Host "Front: $frontDir"
Write-Host "Final: $tempDir"
Write-Host "Backup: $backupDir"
Write-Host "ViteJs: $viteFile"

# 202308311655 -> Editar automáticamente el archivo '/Front/vite.config.js'
# 202402200444 -> https://powershellone.wordpress.com/2021/02/24/using-powershell-and-regex-to-extract-text-between-delimiters/
Function SetEnv {
	# https://stackoverflow.com/a/58933589/2150329
	if (Test-Path $viteFile) {
		$content = (Get-Content $viteFile) | ForEach-Object {
			if ($_ -match 'base\:') {
				$_ -replace '(?<=\").+?(?=\")', $deployPath
			}
			Else {
				$_
			}
		}
		$content | Set-Content -Path $viteFile;
	}
}

if (Test-Path $baseDir) {
	Try {
		
		# if (Test-Path $finalDir) {
		# 	Write-Host "`nHace el backup del compilado actual en '$backupDir'`n" -ForegroundColor Yellow
		# 	Copy-Item -Path $finalDir -Destination $backupDir -Recurse -Force
		# 	Try {
		# 		Write-Host "`nElimina el directorio '$backupDir\.git'`n" -ForegroundColor Yellow
		# 		Remove-Item -LiteralPath "$backupDir\.git" -Force -Recurse
		# 	}
		# 	Catch {
		# 		$ErrorMessage = $_.Exception.Message
		# 		Write-Host "ERROR: $ErrorMessage" -ForegroundColor Red
		# 	}
		# }
		# if ($pause -eq 1) {
		# 	Read-Host -Prompt $pauseMsg
		# }

		Write-Host "`nDesde '$finalDir' cambia a rama '$env'`n" -ForegroundColor Yellow
		Set-Location $finalDir
		# git stash
		git checkout $env
		# git switch -f $env
		git status
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		# 202305311259: Limpia directorio final excepto '.git'
		Write-Host "`nLimpia directorio final '$finalDir' excepto '.git'`n" -ForegroundColor Yellow
		Get-ChildItem -Path "$finalDir" -Recurse | Select -ExpandProperty FullName | Where { $_ -NotLike "$finalDir\.git*" } | Sort Length -Descending | Remove-Item -Force
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		# 202402200448: Modifica vite.config.js de acuerdo a ambiente
		Write-Host "`nModifica vite.config.js al ambiente '$env'`n" -ForegroundColor Yellow
		SetEnv
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		# Compila Vue, mueve contenidos y elimina dist
		Write-Host "`nCompila Vue en directorio '$frontDir'`n" -ForegroundColor Yellow
		cd $frontDir
		npm run build
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		Write-Host "`nMueve '$frontDir\dist\*' a '$finalDir'`n" -ForegroundColor Yellow
		Move-Item "$frontDir\dist\*" $finalDir -Force
		# Move-Item "$frontDir\dist\*" $tempDir -Exclude $tempDir -Force
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		Write-Host "`nElimina '$frontDir\dist'`n" -ForegroundColor Yellow
		Remove-Item -LiteralPath "$frontDir\dist" -Force -Recurse
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		# Compila Dotnet
		# https://stackoverflow.com/a/56473932
		$Env:ASPNETCORE_CAPTURESTARTUPERRORS = "true"
		$Env:ASPNETCORE_DETAILEDERRORS = "true"
		cd ..\Api\
		Write-Host "`nCompila Dotnet en '$finalDir\api'`n" -ForegroundColor Yellow
		dotnet clean
		dotnet publish -c Release -o "$finalDir\api"
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		# Mueve el compilado al directorio final manteniendo '.git'
		# Get-ChildItem -Path "$tempDir" -Recurse | Move-Item -Destination "$finalDir"
		# if ($pause -eq 1) {
		# 	Read-Host -Prompt $pauseMsg
		# }

		Write-Host "`nRealiza el commit y el push '$env'`n" -ForegroundColor Yellow
		Set-Location $finalDir
		git add .
		git commit -am "Actualización $date"
		git push
		git status
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}

		# Abre el directorio
		Start-Process $finalDir

		# 202308311633: Regresa al directorio inicial
		cd "$baseDir\app"

		# 202402200448: Modifica vite.config.js para continuar trabajando
		$deployPath = "/";
		SetEnv
		if ($pause -eq 1) {
			Read-Host -Prompt $pauseMsg
		}
		
		# Start-Process "chrome.exe" "http://esabogprusrcap2.esap.edu.int/sirecec4/"
	}
 Catch {

		cd "$baseDir\app"
		$ErrorMessage = $_.Exception.Message
		Write-Host "ERROR: $ErrorMessage" -ForegroundColor Red
		Break

	}
}