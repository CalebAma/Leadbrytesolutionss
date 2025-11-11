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

// Export environment variables
export const config = {
    env: null,
    async init() {
        this.env = await loadEnvVariables();
    },
    get(key) {
        return this.env?.[key] ?? null;
    }
};

// Initialize configuration
config.init();