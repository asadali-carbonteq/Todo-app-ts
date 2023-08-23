import { UserService } from "../../../Application/Service/UserService";
import DIContainer from "../../../Presentation/di-container";
import { UpdateUserCommand } from "../../command/UserCommand/UpdateUserCommand";


export class UpdateUserHandler {
    async handle(command: UpdateUserCommand) {
        const userService = DIContainer.get<UserService>(UserService);
        const user = await userService.updateUser(command);
        return user;
    }
}




