import UserRepository from "../../Infrastructure/Repository/UserRepository";
const { v4: uuidv4 } = require('uuid');
import { Factory } from "../../Domain/FactoryMethod";
import { Request, Response } from "express";
import { UserNotCreatedException, UserNotDeletedException, UserNotUpdatedException } from "../../Infrastructure/Error/UserServiceError";
import { inject, injectable } from "inversify";

@injectable()
export default class UserService {
    private userRepository: UserRepository;


    constructor(
        @inject(UserRepository) userRepo: UserRepository
    ) {
        this.userRepository = userRepo;
    }

    async signIn(req: Request, res: Response) {
        try {
            const data = req.body;
            const signinUser = await this.userRepository.SignIn(data.email, data.password);
            return signinUser;
        }
        catch (error) {
            return error;
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const data = req.body;
            const generatedUUID = uuidv4();
            const myFactory = new Factory();
            const user = myFactory.UserFactoryMethod(generatedUUID, data.name, data.email, data.password, data.todo);

            const createdUser = await this.userRepository.CreateUser(user);

            return createdUser;
        } catch (error) {
            throw new UserNotCreatedException("New User Not Created");
        }
    }


    async deleteUser(req: Request, res: Response) {

        try {
            const deletedUser = await this.userRepository.DeleteUser(req.params.id);
            return deletedUser;
        } catch (error) {
            throw new UserNotDeletedException("User Not Deleted");
        }
    }


    async updateUser(req: Request, res: Response) {
        try {
            const data = req.body;
            const myFactory = new Factory();
            const user = myFactory.UserFactoryMethod(req.params.id, data.name, data.email, data.passport, data.todo);

            const updatedUser = await this.userRepository.UpdateUser(user);

            return updatedUser;
        } catch (error) {
            throw new UserNotUpdatedException("User Not Updated");
        }
    }

}