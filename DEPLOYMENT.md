# Deployment Guide for Citations Knowledge Base

This guide will help you deploy this project to GitHub Pages.

## Prerequisites

- Git installed on your local machine
- Node.js (v14 or higher) and npm installed
- A GitHub account

## Step 1: Install Git

If you don't have Git installed:

1. Download Git from [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Follow the installation instructions for your operating system

## Step 2: Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

## Step 3: Clone the Repository

If you haven't already:

```bash
git clone https://github.com/rmiyagi13/citaitons-knowledge-base.git
cd citaitons-knowledge-base
```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Install GitHub Pages Package

```bash
npm install --save-dev gh-pages
```

## Step 6: Configure package.json

Ensure your package.json contains:

```json
{
  "homepage": "https://rmiyagi13.github.io/citaitons-knowledge-base",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## Step 7: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your project (`npm run build`)
2. Push the build directory to the gh-pages branch of your repository

## Step 8: Configure GitHub Repository Settings

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Ensure the source is set to the "gh-pages" branch
5. Your site will be published at https://rmiyagi13.github.io/citaitons-knowledge-base/

## Troubleshooting

If your deployment fails:

1. Make sure you have the correct permissions to the repository
2. Check that the repository exists at github.com/rmiyagi13/citaitons-knowledge-base
3. Ensure your build completes successfully (try running `npm run build` separately)
4. Check for any error messages in the console during deployment

## Using GitHub Desktop

If you prefer using GitHub Desktop:

1. Open GitHub Desktop
2. Add the repository
3. Make your changes
4. Commit your changes
5. Push to GitHub
6. Run `npm run deploy` in your terminal

## Manual Deployment

If you need to deploy manually:

1. Run `npm run build`
2. Create a new branch called `gh-pages`
3. Copy the contents of the `build` directory to the root of the `gh-pages` branch
4. Commit and push the changes
5. Go to repository settings and set the source to the `gh-pages` branch 