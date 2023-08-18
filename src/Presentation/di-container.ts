import 'reflect-metadata'
import { Container, LazyServiceIdentifer, interfaces } from "inversify";
import TodoController from "./Controllers/TodoControllers";
import { TodoService } from '../Application/Service/TodoService';
import TodoRepository from "../Infrastructure/Repository/TodoRepository";
import UserController from "./Controllers/UserControllers";
import { UserService } from '../Application/Service/UserService';
import UserRepository from "../Infrastructure/Repository/UserRepository";
var DIContainer = new Container();

DIContainer.bind<TodoController>(TodoController).toSelf();
DIContainer.bind<TodoService>(TodoService).toSelf();
DIContainer.bind<TodoRepository>(TodoRepository).toSelf();

DIContainer.bind<UserRepository>(UserRepository).toSelf();
DIContainer.bind<UserService>(UserService).toSelf();
DIContainer.bind<interfaces.Factory<UserController>>("lazyUserController").toFactory<UserController>((context) => {
    return () => context.container.get<UserController>(UserController);
});


export default DIContainer;