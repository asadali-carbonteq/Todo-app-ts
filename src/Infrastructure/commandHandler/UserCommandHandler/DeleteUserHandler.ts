import { UserService } from "../../../Application/Service/UserService";
import DIContainer from "../../../Presentation/di-container";
import { DeleteUserCommand } from "../../../Application/command/UserCommand/DeleteUserCommand";


export class DeleteUserHandler {
    async handle(command: DeleteUserCommand) {
        const userService = DIContainer.get<UserService>(UserService);
        const user = await userService.deleteUser(command);
        return user;
    }
}


