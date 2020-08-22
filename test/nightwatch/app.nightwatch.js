const http = require("http")
const app = require('../../app')

const PORT = 3001;

let server;

module.exports = {

    before: function () {
        server = http.createServer(app);
        server.listen(PORT)
    },

    after: function () {
        server.close()
    },

    'Index CSP Check': function (browser) {
        browser
            .url(`http://localhost:${PORT}`)
            .waitForElementVisible('body')
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) => log.source === "security");

                if (securityLogs.length) {
                    console.error(securityLogs);
                    throw new Error(`CSP error found for a known script`);
                }
            })
            .end();
    }
};