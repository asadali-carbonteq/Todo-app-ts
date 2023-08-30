const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
import commandHandlerMiddleware from './commandHandlerMiddleware';


const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    commandHandlerMiddleware
]);


export default commandBus;