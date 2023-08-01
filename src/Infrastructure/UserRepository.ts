import { PrismaClient } from "@prisma/client";
import { User } from "../Domain/FactoryMethod";

export default class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async CreateUser(user: User) {
        try {
            const createdUser = await this.prisma.user.create({
                data: {
                    user_id: user.getId(),
                    email: user.getEmail(),
                    name: user.getName(),
                    password: user.getPassword()
                }
            });
            return createdUser;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    async DeleteUser(id: string) {
        try {
            const deletedTodo = await this.prisma.todo.deleteMany({
                where: {
                    authorId: id,
                }
            })
            console.log("all todos for this user are deleted now deleting the user...");
            const deletedUser = await this.prisma.user.delete({
                where: {
                    user_id: id,
                }
            })
            console.log("User Deleted.");
            return deletedUser;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    async UpdateUser(user: User) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    user_id: user.getId(),
                },
                data: {
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                }
            })
            console.log("User Updated Successfullly!!!");
            console.log(updatedUser);
            return updatedUser;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

}