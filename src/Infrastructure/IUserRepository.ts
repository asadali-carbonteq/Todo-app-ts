import { User } from "../Domain/FactoryMethod";

export default interface IUserRepository {
    CreateUser(user: User): Promise<any>;
    DeleteUser(id: string): Promise<any>;
    UpdateUser(user: User): Promise<any>;
}