# Build the project
Write-Host "Building the project..."
npm run build

# Create .nojekyll file
Write-Host "Creating .nojekyll file..."
New-Item -Path "build/.nojekyll" -ItemType File -Force

# Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..."
npm run deploy

Write-Host "Done!"
Read-Host "Press Enter to continue..."

Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process 