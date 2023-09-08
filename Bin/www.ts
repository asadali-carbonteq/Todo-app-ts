import app from "../App/HTTP/Bootstrap/app";
const logger = require('pino')()
import { port } from "./commanderCLI";
import { performSeeding } from "./Faker/seeds";



performSeeding();

app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
});
