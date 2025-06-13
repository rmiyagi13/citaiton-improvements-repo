@echo off
echo Citation Improvements Deployment Helper
echo =====================================
echo.

echo Step 1: Checking if Git is installed...
where git >nul 2>nul
if %errorlevel% neq 0 (
  echo Git is not installed or not in PATH.
  echo Please install Git from https://git-scm.com/downloads
  echo After installation, restart this script.
  pause
  exit /b 1
)

echo Git is installed. Version:
git --version
echo.

echo Step 2: Checking if Node.js is installed...
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo Node.js is not installed or not in PATH.
  echo Please install Node.js from https://nodejs.org/
  echo After installation, restart this script.
  pause
  exit /b 1
)

echo Node.js is installed. Version:
node --version
echo.

echo Step 3: Setting up Git repository...
if not exist .git (
  echo Initializing Git repository...
  git init
  git remote add origin https://github.com/rmiyagi13/citaiton-improvements-repo.git
) else (
  echo Git repository already initialized.
)
echo.

echo Step 4: Installing dependencies...
echo This may take a few minutes...
call npm install
if %errorlevel% neq 0 (
  echo Failed to install dependencies.
  pause
  exit /b 1
)
echo.

echo Step 5: Building the project...
call npm run build
if %errorlevel% neq 0 (
  echo Failed to build the project.
  pause
  exit /b 1
)
echo.

echo Creating .nojekyll file...
echo. > build/.nojekyll

echo Step 6: Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
  echo Failed to deploy to GitHub Pages.
  echo Please check that you have the right permissions to the repository.
  pause
  exit /b 1
)
echo.

echo Deployment completed successfully!
echo Your site should be available at:
echo https://rmiyagi13.github.io/citaiton-improvements-repo/
echo.

echo Done!
pause 