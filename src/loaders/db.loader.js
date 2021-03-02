const config = require("../config");
const mongoose = require("mongoose");

const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose.Promise = global.Promise;

export default class DBLoader {
    connectDB() {
        // Connect to the DB an initialize the app if successful
        mongoose.connect(config.dbUrl, mongooseOptions)
            .then(() => {
                console.info("Database connection successful");
            })
            .catch(err => {
                //eslint-disable-next-line
                console.error(`Database connection error: ${err}`);
            });
    }
}