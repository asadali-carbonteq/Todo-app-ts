import { UserService } from "../../../Application/Service/UserService";
import DIContainer from "../../../Infrastructure/DIContainer";
import { SignInCommand } from "../../command/User/SignInCommand";


export class SignInHandler {
    async handle(command: SignInCommand) {
        const userService = DIContainer.get<UserService>(UserService);
        const user = await userService.signIn(command);
        return user;
    }
}


