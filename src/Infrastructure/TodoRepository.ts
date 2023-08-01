import { PrismaClient } from "@prisma/client";
import { Todo } from "../Domain/FactoryMethod";

export default class TodoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async GetTodo(id: string) {
        try {
            const todos = await this.prisma.todo.findMany({
                where: {
                    authorId: id,
                }
            });
            console.log(todos);
            return todos;
        }
        catch (error) {
            console.log("There is some error in GetTodo()-Repository");
            console.log(error);
        }
    }

    async CreateTodo(todo: Todo) {
        try {
            const createdTodo = await this.prisma.todo.create({
                data: {
                    todo_id: todo.getId(),
                    body: todo.getBody(),
                    author: {
                        connect: {
                            user_id: todo.getAuthorId(),
                        }
                    }
                }
            })
            console.log(createdTodo);
            return createdTodo;
        }
        catch (error) {
            console.log("The error is: ");
            console.log(error)
            return error;
        }
    }

    async UpdateTodo(body: string, id: string) {
        try {
            const updatedTodo = await this.prisma.todo.update({
                where: {
                    todo_id: id,
                },
                data: {
                    body: body,
                }
            })
            console.log("Updated successfully!!")
            console.log(updatedTodo);
            return updatedTodo;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async DeleteTodo(id: string) {
        try {
            const deletedTodo = await this.prisma.todo.delete({
                where: {
                    todo_id: id,
                }
            })
            console.log("Todo Deleted successfully!!")
            return deletedTodo;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}