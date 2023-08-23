import UserRepository from "../../Infrastructure/Repository/UserRepository";
const { v4: uuidv4 } = require('uuid');
import { Request, Response } from "express";
import { UserNotCreatedException, UserNotDeletedException, UserNotUpdatedException } from "../../Infrastructure/Error/UserServiceError";
import { inject, injectable } from "inversify";
import { SignInCommand } from "../../Infrastructure/command/UserCommand/SignInCommand";
import { SignUpCommand } from "../../Infrastructure/command/UserCommand/SignUpCommand";
import { DeleteUserCommand } from "../../Infrastructure/command/UserCommand/DeleteUserCommand";
import { UpdateUserCommand } from "../../Infrastructure/command/UserCommand/UpdateUserCommand";

@injectable()
export class UserService {
    private userRepository: UserRepository;


    constructor(
        @inject(UserRepository) userRepo: UserRepository
    ) {
        this.userRepository = userRepo;
    }


    async signIn(command: SignInCommand) {

        try {
            const email = command.email;
            const password = command.password;

            const signinUser = await this.userRepository.SignIn(email, password);
            return signinUser;
        }
        catch (error) {
            return error;
        }
    }



    async createUser(command: SignUpCommand) {
        try {
            const email = command.email;
            const name = command.name;
            const password = command.password;
            const generatedUUID = uuidv4();

            const createdUser = await this.userRepository.CreateUser(generatedUUID, email, name, password);
            return createdUser;
        }
        catch (error) {
            throw new UserNotCreatedException("New User Not Created");
        }
    }


    async deleteUser(command: DeleteUserCommand) {

        try {
            const id = command.id;
            const deletedUser = await this.userRepository.DeleteUser(id);
            return deletedUser;
        }
        catch (error) {
            throw new UserNotDeletedException("User Not Deleted");
        }
    }


    async updateUser(command: UpdateUserCommand) {
        try {
            const id = command.id;
            const name = command.name;
            const email = command.email;
            const password = command.password;

            const updatedUser = await this.userRepository.UpdateUser(id, name, email, password);
            return updatedUser;
        }
        catch (error) {
            throw new UserNotUpdatedException("User Not Updated");
        }
    }

}