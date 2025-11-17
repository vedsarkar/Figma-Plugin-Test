# Figma Plugin Test

## Quick Start

1. **Set up GitHub Access Token**:
   - Follow the instructions in [GITHUB_TOKEN_SETUP.md](./GITHUB_TOKEN_SETUP.md)
   - Copy `config.example.env` to `.env` and add your token
   - Test your token: `./test-token.sh`

2. **Install dependencies** (if applicable):
   ```bash
   npm install  # or yarn install, pip install, etc.
   ```

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

