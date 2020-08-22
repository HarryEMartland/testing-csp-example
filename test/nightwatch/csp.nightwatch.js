const http = require("http")
const path = require("path")
const express = require("express")

const PORT = 3001;

const app = express();
app.use(require("../../middleware/helmetConfiguration"))
app.use(express.static(path.join(__dirname, "html")));

let server;
module.exports = {

    before: function () {
        server = http.createServer(app);
        server.listen(PORT)
    },

    after: function () {
        server.close()
    },

    'Invalid JS CSP Check': function (browser) {
        browser
            .url(`http://localhost:${PORT}/invalidJsCsp.html`)
            .waitForElementVisible('body')
            .getLog("browser", (result) => {
                const securityLogs = result.filter((log) => log.source === "security");

                if (!securityLogs.length) {
                    throw new Error("No CSP error found");
                }
            })
            .end();
    }
};