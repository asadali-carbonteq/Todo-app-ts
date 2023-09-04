import { seedDatabase } from "./seedDB";
import { fakeseed } from "../commanderCLI";
const logger = require('pino')()



export const performSeeding = () => {
    if (fakeseed > 0) {
        logger.info("Seeding Database, please wait...");
        seedDatabase(fakeseed);
    }
}
