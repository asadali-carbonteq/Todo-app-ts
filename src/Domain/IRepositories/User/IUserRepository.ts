
interface IUserRepository {
    SignIn(email: string, password: string): any;
    CreateUser(uuid: string, email: string, name: string, password: string): any;
    DeleteUser(id: string): any;
    UpdateUser(id: string, name: string, email: string, password: string): any;
}

export default IUserRepository;