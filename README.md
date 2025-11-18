# Figma Design Tokens Plugin

A clean, modern UI for managing design tokens in Figma, with GitHub integration for syncing tokens to your repository.

## Features

- 🎨 Color tokens management with visual swatches
- 📝 Typography tokens for consistent text styles
- 📐 Spacing tokens for layout consistency
- 🔍 Search functionality to filter tokens
- 📁 Export tokens as JSON
- 🔄 GitHub sync integration
- 📱 Responsive design

## Quick Start

1. **View the UI**:
   - Open `index.html` in your browser
   - Or use a local server:
     ```bash
     python3 -m http.server 8000
     # Then visit http://localhost:8000
     ```

2. **Set up GitHub Access Token** (for sync functionality):
   - Follow the instructions in [GITHUB_TOKEN_SETUP.md](./GITHUB_TOKEN_SETUP.md)
   - Copy `config.example.env` to `.env` and add your token
   - Test your token: `./test-token.sh`

## File Structure

```
├── index.html          # Main HTML file with plugin UI
├── styles.css          # CSS styles for the UI
├── script.js           # JavaScript for interactivity
├── config.example.env  # Environment variables template
├── test-token.sh       # GitHub token testing script
└── GITHUB_TOKEN_SETUP.md  # Token setup guide
```

## UI Components

- **Category Dropdown**: Filter tokens by category (All, Colors, Typography, Spacing)
- **Search Bar**: Real-time search across all tokens
- **Token Sections**: Collapsible sections for different token types
  - Colors with visual swatches
  - Typography with size/weight values
  - Spacing with pixel values
- **Action Buttons**:
  - Settings: Configure plugin options
  - Export All: Download tokens as JSON
  - Sync: Push tokens to GitHub repository

## Repository

- **GitHub**: https://github.com/vedsarkar/Figma-Plugin-Test
- **Remote**: `git@github.com:vedsarkar/Figma-Plugin-Test.git`

## Environment Variables

Create a `.env` file based on `config.example.env`:
```bash
cp config.example.env .env
# Then edit .env and add your actual GitHub token
```

Required variables:
- `GITHUB_TOKEN` - Your GitHub personal access token
- `GITHUB_REPO` - Repository name (default: `vedsarkar/Figma-Plugin-Test`)

## Testing

Test your GitHub token setup:
```bash
./test-token.sh
```

