import { UserService } from "../../../Application/Service/UserService";
import DIContainer from "../../../Infrastructure/DIContainer";
import { DeleteUserCommand } from "../../command/User/DeleteUserCommand";


export class DeleteUserHandler {
    async handle(command: DeleteUserCommand) {
        const userService = DIContainer.get<UserService>(UserService);
        const user = await userService.deleteUser(command);
        return user;
    }
}


