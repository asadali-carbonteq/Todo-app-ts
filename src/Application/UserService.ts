import UserRepository from "../Infrastructure/UserRepository";
const { v4: uuidv4 } = require('uuid');
import { ModelFactory, User } from "../Domain/FactoryMethod";
import { Request, Response } from "express";


export default class UserService {
    private userRepository: UserRepository;


    constructor() {
        this.userRepository = new UserRepository();
    }


    async createUser(req: Request, res: Response) {
        const data = req.body;
        const generatedUUID = uuidv4();
        const myModelFactory = new ModelFactory();

        const user = myModelFactory.getModel("user") as User;
        user.setId(generatedUUID);
        user.setName(data.name);
        user.setEmail(data.email);
        user.setPassword(data.password);

        const createdUser = await this.userRepository.CreateUser(user);
        return createdUser;
    }


    async deleteUser(req: Request, res: Response) {
        const deletedUser = await this.userRepository.DeleteUser(req.params.id);
        return deletedUser;
    }


    async updateUser(req: Request, res: Response) {
        const data = req.body;
        const myModelFactory = new ModelFactory();

        const user = myModelFactory.getModel("user") as User;
        user.setId(req.params.id);
        user.setName(data.name);
        user.setEmail(data.email);
        user.setPassword(data.password);
        user.setTodo(data.todo);

        const updatedUser = await this.userRepository.UpdateUser(user);
        return updatedUser;
    }

}