# GitHub Access Token Setup Guide

## Repository Information
- **Repository**: `vedsarkar/Figma-Plugin-Test`
- **GitHub URL**: https://github.com/vedsarkar/Figma-Plugin-Test

## How to Create a GitHub Access Token

### Step 1: Generate a Personal Access Token (Classic)

1. Go to GitHub Settings:
   - Click your profile picture (top right)
   - Select **Settings**
   - Or go directly to: https://github.com/settings/profile

2. Navigate to Developer Settings:
   - Scroll down in the left sidebar
   - Click **Developer settings**
   - Or go directly to: https://github.com/settings/developers

3. Create a Personal Access Token:
   - Click **Personal access tokens** → **Tokens (classic)**
   - Click **Generate new token** → **Generate new token (classic)**

4. Configure the Token:
   - **Note**: Give it a descriptive name (e.g., "Figma-Plugin-Test")
   - **Expiration**: Choose an expiration period (30 days, 90 days, or no expiration)
   - **Select scopes** (permissions):
     - For basic repo access: ✅ `repo` (Full control of private repositories)
     - For public repos only: ✅ `public_repo` (Access public repositories)
     - For workflow automation: ✅ `workflow` (Update GitHub Action workflows)
     - For reading repo contents: ✅ `read:org` (if needed)

5. Generate and Copy:
   - Click **Generate token**
   - **IMPORTANT**: Copy the token immediately - you won't be able to see it again!
   - The token will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Store the Token Securely

#### Option 1: Using .env file (Recommended)

1. Copy the example file:
   ```bash
   cp config.example.env .env
   ```

2. Edit `.env` and add your token:
   ```bash
   GITHUB_TOKEN=ghp_your_actual_token_here
   GITHUB_REPO=vedsarkar/Figma-Plugin-Test
   ```

3. The `.env` file is already in `.gitignore` and won't be committed to git.

#### Option 2: Using Environment Variables

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):
```bash
export GITHUB_TOKEN=ghp_your_actual_token_here
export GITHUB_REPO=vedsarkar/Figma-Plugin-Test
```

Then reload:
```bash
source ~/.zshrc  # or source ~/.bashrc
```

#### Option 3: Using GitHub CLI

If you have GitHub CLI installed:
```bash
gh auth login
```

This will guide you through authentication and store the token securely.

### Step 3: Verify the Token

Test your token with:
```bash
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

Or using GitHub CLI:
```bash
gh auth status
```

## Security Best Practices

1. ✅ **Never commit tokens to git** - The `.gitignore` file protects `.env` files
2. ✅ **Use fine-grained permissions** - Only grant the minimum required scopes
3. ✅ **Set expiration dates** - Regularly rotate your tokens
4. ✅ **Use different tokens** - Create separate tokens for different projects
5. ✅ **Revoke unused tokens** - Delete tokens you're no longer using

## Using the Token in Your Code

### JavaScript/Node.js Example:
```javascript
const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPO;

// Example: Fetch repository info
fetch(`https://api.github.com/repos/${repo}`, {
  headers: {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### Python Example:
```python
import os
import requests

token = os.getenv('GITHUB_TOKEN')
repo = os.getenv('GITHUB_REPO')

headers = {
    'Authorization': f'token {token}',
    'Accept': 'application/vnd.github.v3+json'
}

response = requests.get(f'https://api.github.com/repos/{repo}', headers=headers)
print(response.json())
```

## Troubleshooting

- **Token not working?** Check if it has the correct scopes/permissions
- **403 Forbidden?** Verify the token hasn't expired
- **Token not found?** Make sure `.env` file exists and contains `GITHUB_TOKEN=...`

## Need Help?

- GitHub Docs: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- GitHub API Docs: https://docs.github.com/en/rest

