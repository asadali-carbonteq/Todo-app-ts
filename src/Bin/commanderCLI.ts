import { Command } from "commander";
import { seedDatabase } from "./Faker/seedDB";


const program = new Command();

const portArg = program
    .option('-p, --port <port>', 'Specify the Port number for the server')
    .parse(process.argv);

const port = Number(portArg.args[0]) || 8080;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const seed = new Command();

const seedArg = seed
    .option('-s, --seed <number>', 'Specify the number of Rows to seed in Database')
    .parse(process.argv);

const fakeseed = Number(seedArg.args[1]) || 0;

if (fakeseed > 0) {
    seedDatabase(fakeseed);
}

export { port };

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
