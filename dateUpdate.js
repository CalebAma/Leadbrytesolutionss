// Secure Copyright Year Updater
(function() {
    'use strict';
    
    // DOM Ready Handler
    document.addEventListener('DOMContentLoaded', function() {
        try {
            // Get current year securely
            const currentYear = new Date().getFullYear();
            
            // Validate the year is reasonable (prevent potential time manipulation issues)
            const minValidYear = 2020;
            const maxValidYear = currentYear + 5;
            const yearToDisplay = (currentYear >= minValidYear && currentYear <= maxValidYear) 
                ? currentYear 
                : minValidYear;
            
            // Safely update the DOM
            const copyrightElements = document.querySelectorAll('[data-copyright-year]');
            
            if (copyrightElements.length > 0) {
                copyrightElements.forEach(element => {
                    // Use textContent instead of innerHTML to prevent XSS
                    element.textContent = element.textContent.replace(
                        /©\s*\d{4}/, 
                        `© ${yearToDisplay}`
                    );
                });
            } else {
                // Fallback for your specific case
                const footerText = document.querySelector('.mt-12.pt-8.border-t.border-white\\/10.text-center.text-gray-400 p');
                if (footerText) {
                    footerText.textContent = footerText.textContent.replace(
                        /©\s*\d{4}/, 
                        `© ${yearToDisplay}`
                    );
                }
            }
            
            // Optional: Console log for debugging (remove in production)
            console.debug(`Copyright year updated to: ${yearToDisplay}`);
            
        } catch (error) {
            // Graceful error handling
            console.error('Failed to update copyright year:', error);
            // Fallback to static year or leave as-is
        }
    });
})();