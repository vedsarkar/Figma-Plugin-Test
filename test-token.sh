#!/bin/bash

# Test GitHub Access Token
# Usage: ./test-token.sh

# Load environment variables from .env if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if token is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN is not set"
    echo "Please set it in your .env file or export it:"
    echo "  export GITHUB_TOKEN=ghp_your_token_here"
    exit 1
fi

# Set default repo if not provided
REPO=${GITHUB_REPO:-"vedsarkar/Figma-Plugin-Test"}

echo "🔍 Testing GitHub Access Token..."
echo "Repository: $REPO"
echo ""

# Test token by fetching user info
RESPONSE=$(curl -s -w "\n%{http_code}" -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user)

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    USERNAME=$(echo "$BODY" | grep -o '"login":"[^"]*' | cut -d'"' -f4)
    echo "✅ Token is valid!"
    echo "   Authenticated as: $USERNAME"
    echo ""
    
    # Test repository access
    echo "🔍 Testing repository access..."
    REPO_RESPONSE=$(curl -s -w "\n%{http_code}" -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO")
    
    REPO_HTTP_CODE=$(echo "$REPO_RESPONSE" | tail -n1)
    REPO_BODY=$(echo "$REPO_RESPONSE" | sed '$d')
    
    if [ "$REPO_HTTP_CODE" -eq 200 ]; then
        REPO_NAME=$(echo "$REPO_BODY" | grep -o '"full_name":"[^"]*' | cut -d'"' -f4)
        echo "✅ Repository access confirmed!"
        echo "   Repository: $REPO_NAME"
    elif [ "$REPO_HTTP_CODE" -eq 404 ]; then
        echo "⚠️  Repository not found or no access"
        echo "   Make sure the token has 'repo' scope"
    else
        echo "❌ Error accessing repository (HTTP $REPO_HTTP_CODE)"
    fi
else
    echo "❌ Token is invalid or expired (HTTP $HTTP_CODE)"
    echo "   Please check your token and try again"
    exit 1
fi

