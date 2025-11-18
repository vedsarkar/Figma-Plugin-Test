// Handle search functionality
const searchInput = document.querySelector('.search-input');
const tokenSections = document.querySelectorAll('.token-section');

searchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    tokenSections.forEach(section => {
        const tokenItems = section.querySelectorAll('.token-item');
        let hasVisibleItems = false;
        
        tokenItems.forEach(item => {
            const tokenName = item.querySelector('.token-name')?.textContent.toLowerCase() || '';
            const tokenValue = item.querySelector('.token-value')?.textContent.toLowerCase() || '';
            
            if (tokenName.includes(searchTerm) || tokenValue.includes(searchTerm)) {
                item.style.display = 'flex';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide section based on whether it has visible items
        section.style.display = hasVisibleItems || searchTerm === '' ? 'block' : 'none';
    });
});

// Handle category dropdown
const categoryDropdown = document.querySelector('.category-dropdown');

categoryDropdown?.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    
    tokenSections.forEach(section => {
        const sectionTitle = section.querySelector('.section-title')?.textContent || '';
        
        if (selectedCategory === 'Category Dropdown: All') {
            section.style.display = 'block';
        } else if (sectionTitle.toLowerCase().includes(selectedCategory.toLowerCase())) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});

// Handle footer buttons
const footerButtons = document.querySelectorAll('.footer-btn');

footerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;
        
        switch(buttonText) {
            case 'Settings':
                console.log('Settings clicked');
                // Add settings modal/panel logic here
                alert('Settings panel would open here');
                break;
            case 'Export All':
                console.log('Export All clicked');
                // Add export functionality here
                exportTokens();
                break;
            case 'Sync':
                console.log('Sync clicked');
                // Add sync functionality here
                syncWithGitHub();
                break;
        }
    });
});

// Export tokens function
function exportTokens() {
    const tokens = {
        colors: [],
        typography: [],
        spacing: []
    };
    
    // Gather all tokens
    tokenSections.forEach(section => {
        const sectionTitle = section.querySelector('.section-title')?.textContent || '';
        const category = sectionTitle.split(' ')[0].toLowerCase();
        const tokenItems = section.querySelectorAll('.token-item');
        
        tokenItems.forEach(item => {
            const name = item.querySelector('.token-name')?.textContent || '';
            const value = item.querySelector('.token-value')?.textContent || '';
            
            if (tokens[category]) {
                tokens[category].push({ name, value });
            }
        });
    });
    
    // Download as JSON
    const dataStr = JSON.stringify(tokens, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design-tokens.json';
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Tokens exported successfully!');
}

// Sync with GitHub function
async function syncWithGitHub() {
    // Check if token exists in environment
    const githubToken = process.env?.GITHUB_TOKEN || localStorage.getItem('github_token');
    
    if (!githubToken) {
        alert('Please configure your GitHub token first in Settings');
        return;
    }
    
    alert('Sync functionality would connect to GitHub here.\nRepository: vedsarkar/Figma-Plugin-Test');
    
    // In a real implementation, this would:
    // 1. Gather all current tokens
    // 2. Format them appropriately
    // 3. Push to GitHub using the GitHub API
    // 4. Show success/error message
}

// Add smooth scrolling for the tokens container
const tokensContainer = document.querySelector('.tokens-container');
if (tokensContainer) {
    // Add smooth scrolling behavior
    tokensContainer.style.scrollBehavior = 'smooth';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Figma Design Tokens Plugin loaded');
});
