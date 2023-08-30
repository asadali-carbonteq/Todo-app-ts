import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import prisma from "../Database/prisma";



@injectable()
export default class TodoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async GetTodo(id: string, pages: number, size: number) {
        try {
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

            const result = { statusCode: 201, todo: todos, message: "Get Todo Successful" };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error, message: "Get Todo Failed" };
            return result;
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

            const result = { statusCode: 201, todo: createdTodo, message: "Todo Created Successfully" };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error, message: "Todo Creation Failed" };
            return result;
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

            const result = { statusCode: 201, todo: updatedTodo, message: "Todo Updated Successfully" };
            return result;
        } catch (error) {
            const result = { statusCode: 400, error: error, message: "Todo Updation Failed" };
            return result;
        }
    }

    async DeleteTodo(id: string) {
        try {
            const deletedTodo = await this.prisma.todo.delete({
                where: {
                    todo_id: id,
                }
            })

            const result = { statusCode: 201, todo: deletedTodo, message: "Todo Deleted Successfully" };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error, message: "Todo Deletion Failed" };
            return result;
        }
    }
}