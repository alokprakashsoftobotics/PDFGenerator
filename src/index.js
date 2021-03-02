// App loaders
import DBLoader from './loaders/db.loader';
import ExpressLoader from './loaders/express.loader';

// initialize express loader
const server = new ExpressLoader();

// Initialize database loader
const dbLoader = new DBLoader();
dbLoader.connectDB();

export default server.Server;