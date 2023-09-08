import { UserService } from "../../../Application/Service/UserService";
import DIContainer from "../../../Infrastructure/DIContainer";
import { SignUpCommand } from "../../command/User/SignUpCommand";


export class SignUpHandler {
    async handle(command: SignUpCommand) {
        const userService = DIContainer.get<UserService>(UserService);
        const user = await userService.createUser(command);
        return user;
    }
}


