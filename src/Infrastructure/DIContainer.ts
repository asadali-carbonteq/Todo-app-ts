import 'reflect-metadata'
import { Container, LazyServiceIdentifer, interfaces } from "inversify";
import TodoController from "../HTTP/Controllers/TodoControllers";
import { TodoService } from '../Application/Service/TodoService';
import TodoRepository from "./Repository/TodoRepository";
import UserController from "../HTTP/Controllers/UserControllers";
import { UserService } from '../Application/Service/UserService';
import UserRepository from "./Repository/UserRepository";



var DIContainer = new Container();

DIContainer.bind<TodoService>(TodoService).toSelf();
DIContainer.bind<TodoController>(TodoController).toSelf();
DIContainer.bind<TodoRepository>(TodoRepository).toSelf();
// DIContainer.bind<interfaces.Factory<TodoController>>("lazyTodoController").toFactory<TodoController>((context) => {
//     return () => context.container.get<TodoController>(TodoController);
// });


DIContainer.bind<UserRepository>(UserRepository).toSelf();
DIContainer.bind<UserService>(UserService).toSelf();
// DIContainer.bind<UserController>(UserController).toSelf();
DIContainer.bind<interfaces.Factory<UserController>>("lazyUserController").toFactory<UserController>((context) => {
    return () => context.container.get<UserController>(UserController);
});


export default DIContainer;