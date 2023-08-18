//import { GetTodoHandler } from "./commandHandler/GetTodoHandler";
const {
    CommandHandlerMiddleware,
    ClassNameExtractor,
    InMemoryLocator,
    HandleInflector
} = require("simple-command-bus")
const { CommandBus, LoggerMiddleware } = require("simple-command-bus");

const GetTodoHandler = require("./commandHandler/TodoCommandHandler/GetTodoHandler").GetTodoHandler;
const AddTodoHandler = require("./commandHandler/TodoCommandHandler/AddTodoHandler").AddTodoHandler;
const UpdateTodoHandler = require("./commandHandler/TodoCommandHandler/UpdateTodoHandler").UpdateTodoHandler;
const DeleteTodoHandler = require("./commandHandler/TodoCommandHandler/DeleteTodoHandler").DeleteTodoHandler;

const SignInHandler = require("./commandHandler/UserCommandHandler/SignInHandler").SignInHandler;
const SignUpHandler = require("./commandHandler/UserCommandHandler/SignUpHandler").SignUpHandler;
const DeleteUserHandler = require("./commandHandler/UserCommandHandler/DeleteUserHandler").DeleteUserHandler;
const UpdateUserHandler = require("./commandHandler/UserCommandHandler/UpdateUserHandler").UpdateUserHandler;


const commandHandlerMiddleware = new CommandHandlerMiddleware(
    new ClassNameExtractor(),
    new InMemoryLocator({
        GetTodoHandler: new GetTodoHandler(),
        AddTodoHandler: new AddTodoHandler(),
        UpdateTodoHandler: new UpdateTodoHandler(),
        DeleteTodoHandler: new DeleteTodoHandler(),

        SignInHandler: new SignInHandler(),
        SignUpHandler: new SignUpHandler(),
        DeleteUserHandler: new DeleteUserHandler(),
        UpdateUserHandler: new UpdateUserHandler()
    }),
    new HandleInflector()
)




module.exports = commandHandlerMiddleware
