import { UserService } from "../../../Application/Service/UserService";
import DIContainer from "../../../Presentation/di-container";
import { SignUpCommand } from "../../command/UserCommand/SignUpCommand";


export class SignUpHandler {
    async handle(command: SignUpCommand) {
        const userService = DIContainer.get<UserService>(UserService);
        const user = await userService.createUser(command);
        return user;
    }
}


