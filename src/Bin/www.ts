import app from "../HTTP/Bootstrap/app";
const logger = require('pino')()
import { port } from "./commanderCLI";
import { performSeeding } from "./seeds";



performSeeding();

app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
});
