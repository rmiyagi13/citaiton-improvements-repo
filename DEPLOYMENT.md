# Deployment Guide for Citation Improvements

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
git clone https://github.com/rmiyagi13/citaiton-improvements-repo.git
cd citaiton-improvements-repo
```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Install GitHub Pages Package (if not already in package.json)

```bash
npm install --save-dev gh-pages
```

## Step 6: Configure package.json

Ensure your package.json contains:

```json
{
  "homepage": "https://rmiyagi13.github.io/citaiton-improvements-repo",
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
5. Your site will be published at https://rmiyagi13.github.io/citaiton-improvements-repo/

## Troubleshooting

If your deployment fails:

1. Make sure you have the correct permissions to the repository
2. Check that the repository exists at github.com/rmiyagi13/citaiton-improvements-repo
3. Ensure your build completes successfully (try running `npm run build` separately)
4. Check for any error messages in the console during deployment 