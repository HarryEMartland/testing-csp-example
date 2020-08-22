let helmet = require('helmet');

module.exports = helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'", "https://stackpath.bootstrapcdn.com"]
        }
    }
})