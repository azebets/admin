/**
 * Determines if code is running in browser/frontend
 */
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
};

/**
 * Gets the appropriate API URL based on environment
 */
export const getApiUrl = (): string => {
    // Check if running in browser
    if (isBrowser()) {
        // Check if running locally
        const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
        
        return isLocalhost 
            ? 'http://localhost:8000' 
            : 'https://rx-casino.onrender.com'; // Replace with your production API URL
    }

    // Server-side - use environment variable
    return 'http://localhost:8000' 
};