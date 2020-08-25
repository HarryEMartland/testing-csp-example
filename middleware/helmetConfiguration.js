let helmet = require('helmet');

module.exports = helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'", "https://stackpath.bootstrapcdn.com", "https://cdn.jsdelivr.net", "https://code.jquery.com"]
        }
    }
})