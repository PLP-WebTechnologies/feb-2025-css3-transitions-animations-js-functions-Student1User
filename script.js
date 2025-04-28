document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animBox = document.getElementById('animBox');
    const startAnimationBtn = document.getElementById('startAnimation');
    const toggleAnimationBtn = document.getElementById('toggleAnimation');
    const savePrefsBtn = document.getElementById('savePrefs');
    const loadPrefsBtn = document.getElementById('loadPrefs');
    const resetPrefsBtn = document.getElementById('resetPrefs');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    // Load preferences when page loads
    loadPreferences();
    
    // Event Listeners
    startAnimationBtn.addEventListener('click', startAnimation);
    toggleAnimationBtn.addEventListener('click', toggleRotation);
    savePrefsBtn.addEventListener('click', savePreferences);
    loadPrefsBtn.addEventListener('click', loadPreferences);
    resetPrefsBtn.addEventListener('click', resetPreferences);
    
    // Add hover effect to gallery images using JavaScript
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Animation Functions
    function startAnimation() {
        // Add the animation class
        animBox.classList.add('animate-box');
        
        // Remove the class after animation completes to allow re-running
        setTimeout(() => {
            animBox.classList.remove('animate-box');
        }, 2000);
    }
    
    function toggleRotation() {
        animBox.classList.toggle('rotate');
    }
    
    // LocalStorage Functions
    function savePreferences() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyTheme(preferences.theme);
        
        // Show confirmation animation
        const confirmation = document.createElement('div');
        confirmation.textContent = 'Preferences saved!';
        confirmation.style.position = 'fixed';
        confirmation.style.bottom = '20px';
        confirmation.style.right = '20px';
        confirmation.style.padding = '10px 20px';
        confirmation.style.backgroundColor = '#4CAF50';
        confirmation.style.color = 'white';
        confirmation.style.borderRadius = '5px';
        confirmation.style.opacity = '0';
        confirmation.style.transition = 'opacity 0.5s ease';
        
        document.body.appendChild(confirmation);
        
        // Fade in
        setTimeout(() => {
            confirmation.style.opacity = '1';
        }, 10);
        
        // Fade out and remove
        setTimeout(() => {
            confirmation.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(confirmation);
            }, 500);
        }, 3000);
    }
    
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            usernameInput.value = preferences.username;
            themeSelect.value = preferences.theme;
            applyTheme(preferences.theme);
        }
    }
    
    function resetPreferences() {
        localStorage.removeItem('userPreferences');
        usernameInput.value = '';
        themeSelect.value = 'light';
        applyTheme('light');
    }
    
    function applyTheme(theme) {
        // Remove all theme classes first
        document.body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        document.body.classList.add(theme);
    }
    
    // Bonus: Add click animation to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});