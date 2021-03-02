const bodyParser = require("body-parser");
const express = require("express");
const expressValidator = require('express-validator')
const path = require("path");
const cors = require('cors');

const routes = require("../routes");
const config = require("../config");


class ExpressLoader {
    constructor() {
        const app = express();

        app.use(cors());

        // Serve static content
        app.use(express.static(path.join(__dirname, "uploads")));

        // Set up middleware
        app.use(bodyParser.urlencoded({
            extended: false,
            limit: "20mb",
            parameterLimit: 50000
        }));
        app.use(bodyParser.json({ limit: "20mb" }));

        app.use("/public", express.static(path.join(__dirname, '/public')));

        // set routes
        app.all('/*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });

        app.use(expressValidator());

        app.use('/api/v1', routes);

        app.get('/', (req, res) => {
            res.send("connection successfull, Invalid endpoint");
        });

        // Setup error handling, this must be after all other middleware
        app.use(ExpressLoader.errorHandler);

        // Start application
        this.server = app.listen(config.port, () => {
            console.info(`Server running, now listening on port ${config.port}`);
        });

        
    }

    get Server() {
        return this.server;
    }

    /**
     * @description Default error handler to be used with express
     * @param error Error object
     * @param req {object} Express req object
     * @param res {object} Express res object
     * @param next {function} Express next object
     * @returns {*}
     */

    static errorHandler(error, req, res, next) {
        let parsedError;
        console.log(`errorHandler: ${error}`);

        // Attempt to gracefully parse error object
        try {
            if (error && typeof error === "object") {
                parsedError = JSON.stringify(error);
            } else {
                parsedError = error;
            }
        } catch (e) {
            console.error(e);
        }

        // Log the original error
        console.error(parsedError);

        // If response is already sent, don't attempt to respond to client
        if (res.headersSent) {
            return next(error);
        }

        res.status(400).json({
            success: false,
            error,
            message: 'Internal server error'
        });
    }
}

module.exports = ExpressLoader;