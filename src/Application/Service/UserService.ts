import UserRepository from "../../Infrastructure/Repository/UserRepository";
const { v4: uuidv4 } = require('uuid');
import { ModelFactory, User } from "../../Domain/FactoryMethod";
import { Request, Response } from "express";
import IUserRepository from "../../Infrastructure/Interface/IUserRepository";
import { UserNotCreatedException, UserNotDeletedException, UserNotUpdatedException } from "../Error/UserServiceError";


export default class UserService {
    private userRepository: IUserRepository;


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

        if (!createdUser) {
            res.status(400).json({ message: "There was some error while Signup." })
            throw new UserNotCreatedException("New User Not Created");
        }

        return createdUser;
    }


    async deleteUser(req: Request, res: Response) {
        const deletedUser = await this.userRepository.DeleteUser(req.params.id);

        if (!deletedUser) {
            res.status(400).json({ message: "There was some error deleting the user." });
            throw new UserNotDeletedException("User Not Deleted");
        }

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

        if (!updatedUser) {
            res.status(400).json({ message: "There was some error updating the User." });
            throw new UserNotUpdatedException("User Not Updated");
        }

        return updatedUser;
    }

}