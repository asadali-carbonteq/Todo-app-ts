import UserRepository from "../../Infrastructure/Repository/UserRepository";
const { v4: uuidv4 } = require('uuid');
import { UserNotCreatedException, UserNotDeletedException, UserNotUpdatedException } from "../../Infrastructure/Error/UserServiceError";
import { inject, injectable } from "inversify";
import { SignInCommand } from "../command/User/SignInCommand";
import { SignUpCommand } from "../command/User/SignUpCommand";
import { DeleteUserCommand } from "../command/User/DeleteUserCommand";
import { UpdateUserCommand } from "../command/User/UpdateUserCommand";
import NotificationService from "./NotificationService";



@injectable()
export class UserService {
    private userRepository: UserRepository;
    private notificationService: NotificationService;

    constructor(
        @inject(UserRepository) userRepo: UserRepository,
        @inject(NotificationService) notificationService: NotificationService
    ) {
        this.userRepository = userRepo;
        this.notificationService = notificationService;
    }


    async signIn(command: SignInCommand) {

        try {
            const email = command.email;
            const password = command.password;

            const signinUser = await this.userRepository.SignIn(email, password);


            if ('user' in signinUser) {
                this.notificationService.setEmail(signinUser.user.email);
                this.notificationService.notifyObserver("User Sign In Successful");
            }

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

            if ('user' in createdUser) {
                this.notificationService.setEmail(createdUser.user.email);
                this.notificationService.notifyObserver("Your account has successfully created");
            }

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

            if ('user' in deletedUser) {
                this.notificationService.setEmail(deletedUser.user.email);
                this.notificationService.notifyObserver("Your account has been deleted");
            }

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

            if ('user' in updatedUser) {
                this.notificationService.setEmail(updatedUser.user.email);
                this.notificationService.notifyObserver("Your Account has been succesfully deleted");
            }

            return updatedUser;
        }
        catch (error) {
            throw new UserNotUpdatedException("User Not Updated");
        }
    }

}