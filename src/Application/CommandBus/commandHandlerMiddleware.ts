//import { GetTodoHandler } from "./commandHandler/GetTodoHandler";
const {
    CommandHandlerMiddleware,
    ClassNameExtractor,
    InMemoryLocator,
    HandleInflector
} = require("simple-command-bus")


import { GetTodoHandler } from "../commandHandler/TodoCommandHandler/GetTodoHandler";
import { AddTodoHandler } from "../commandHandler/TodoCommandHandler/AddTodoHandler";
import { UpdateTodoHandler } from "../commandHandler/TodoCommandHandler/UpdateTodoHandler";
import { DeleteTodoHandler } from "../commandHandler/TodoCommandHandler/DeleteTodoHandler";

import { SignInHandler } from "../commandHandler/UserCommandHandler/SignInHandler";
import { SignUpHandler } from "../commandHandler/UserCommandHandler/SignUpHandler";
import { DeleteUserHandler } from "../commandHandler/UserCommandHandler/DeleteUserHandler";
import { UpdateUserHandler } from "../commandHandler/UserCommandHandler/UpdateUserHandler";



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


export default commandHandlerMiddleware;

