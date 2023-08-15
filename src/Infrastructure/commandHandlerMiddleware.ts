const {
    CommandHandlerMiddleware,
    ClassNameExtractor,
    InMemoryLocator,
    HandleInflector
} = require("simple-command-bus")
const GetTodoHandler = require("./commandHandler/GetTodoHandler").GetTodoHandler;


const commandHandlerMiddleware = new CommandHandlerMiddleware(
    new ClassNameExtractor(),
    new InMemoryLocator({
        GetTodoHandler: new GetTodoHandler()
    }),
    new HandleInflector()
)

module.exports = commandHandlerMiddleware
