import { PrismaClient } from "@prisma/client";
import { Todo } from "../../Domain/Todo";
import { injectable } from "inversify";


@injectable()
export default class TodoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async GetTodo(id: string, pages: number, size: number) {
        try {
            console.log("hello hello from the repository")
            const Per_Page = size;
            const skip = (Per_Page * (pages - 1));
            const todos = await this.prisma.todo.findMany({
                skip: skip,
                take: Per_Page,
                where: {
                    authorId: id,
                },
                orderBy: {
                    createdAt: 'asc',
                }
            });
            console.log("hello hello out the prisma.todo.findmany")
            return todos;
        }
        catch (error) {
            console.log("There is some thing wrong:");
            console.log(error);
        }
    }

    async CreateTodo(id: string, body: string, userId: string) {
        try {
            const createdTodo = await this.prisma.todo.create({
                data: {
                    todo_id: id,
                    body: body,
                    author: {
                        connect: {
                            user_id: userId,
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

    async UpdateTodo(id: string, body: string) {
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