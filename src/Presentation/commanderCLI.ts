import { Command } from "commander";


const program = new Command();

const portArg = program
    .option('-p, --port <port>', 'Specify the Port number for the server')
    .parse(process.argv);

const port = Number(portArg.args[0]) || 8080;

export { port };
