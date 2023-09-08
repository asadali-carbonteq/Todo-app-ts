import { UserService } from "../../../Application/Service/UserService";
import DIContainer from "../../../Infrastructure/DIContainer";
import { UpdateUserCommand } from "../../command/User/UpdateUserCommand";


export class UpdateUserHandler {
    async handle(command: UpdateUserCommand) {
        const userService = DIContainer.get<UserService>(UserService);
        const user = await userService.updateUser(command);
        return user;
    }
}




