@echo off
if not defined in_subprocess (cmd /k set in_subprocess=y ^& %0 %*) & exit )


where /q node
IF ERRORLEVEL 1 (
	ECHO Nodejs não instalado, redirecionando para página de download
	start https://nodejs.org
	EXIT /B
)

where /q ng
IF ERRORLEVEL 1 (
	npm i @angular/cli -g
	EXIT /B
)

start cmd /c "cd Web && npm i"
start cmd /c "title=FRONT && cd Web && code . && ng serve -o --port=4200 --hmr"


start cmd /c "title=API && cd Api && dotnet build && dotnet watch run --urls=https://localhost:5001;http://localhost:5000"



exit
