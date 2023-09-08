import 'reflect-metadata'
import { Container, LazyServiceIdentifer, interfaces } from "inversify";
import TodoController from "../HTTP/Controllers/TodoControllers";
import { TodoService } from '../Application/Service/TodoService';
import TodoRepository from "./Repository/TodoRepository";
import UserController from "../HTTP/Controllers/UserControllers";
import { UserService } from '../Application/Service/UserService';
import UserRepository from "./Repository/UserRepository";
import Notification from './Notification/Notification';
import Email from './Notification/Email/Email';
import Slack from './Notification/Slack/Slack';
import NotificationService from '../Application/Service/NotificationService';


var DIContainer = new Container();

DIContainer.bind<TodoService>(TodoService).toSelf();
DIContainer.bind<TodoController>(TodoController).toSelf();
DIContainer.bind<TodoRepository>(TodoRepository).toSelf();

DIContainer.bind<UserRepository>(UserRepository).toSelf();
DIContainer.bind<UserService>(UserService).toSelf();
DIContainer.bind<interfaces.Factory<UserController>>("lazyUserController").toFactory<UserController>((context) => {
    return () => context.container.get<UserController>(UserController);
});

DIContainer.bind<NotificationService>(NotificationService).toSelf();
DIContainer.bind<Notification>(Notification).toSelf();
DIContainer.bind<Email>(Email).toSelf();
DIContainer.bind<Slack>(Slack).toSelf();


export default DIContainer;