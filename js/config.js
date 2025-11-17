// Load and parse environment variables
const loadEnvVariables = async () => {
    try {
        const response = await fetch('/.env');
        const text = await response.text();
        
        // Parse .env file content
        const envVars = {};
        text.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, value] = line.split('=');
                if (key && value) {
                    envVars[key.trim()] = value.trim();
                }
            }
        });
        return envVars;
    } catch (error) {
        console.error('Error loading environment variables:', error);
        return {};
    }
};

// Default non-sensitive configuration values for when /.env is missing or incomplete
const defaultConfig = {
    SITE_NAME: 'LeadBryteSolutions',
    FACEBOOK_URL: '#',
    TWITTER_URL: '#',
    LINKEDIN_URL: '#',
    INSTAGRAM_URL: '#',
    WHATSAPP_NUMBER: '+233558531839'
};

// Export environment variables
export const config = {
    env: null,
    async init() {
        this.env = await loadEnvVariables();
    },
    get(key) {
        // Prefer value from loaded env vars, otherwise fall back to defaults
        return (this.env && this.env[key] !== undefined)
            ? this.env[key]
            : (defaultConfig[key] ?? null);
    }
};

// Initialize configuration
config.init();