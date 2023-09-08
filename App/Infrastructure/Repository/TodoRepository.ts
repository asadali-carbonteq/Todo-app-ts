import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import prisma from "../Database/prisma";
import ITodoRepository from "../../Domain/IRepositories/Todo/ITodoRepository";
import PaginationOptions from "../utils/Pagination/paginationOption";
import PaginationData from "../utils/Pagination/paginationData";


@injectable()
export default class TodoRepository implements ITodoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async GetTodoCount(id: string) {
        let totalTodoCount = await this.prisma.todo.count({
            where: {
                authorId: id,
            }
        });
        return totalTodoCount
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
            const result = { statusCode: 201, todo: createdTodo };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error };
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
            const result = { statusCode: 200, todo: updatedTodo };
            return result;
        } catch (error) {
            const result = { statusCode: 400, error: error };
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
            const result = { statusCode: 200, todo: deletedTodo };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error };
            return result;
        }
    }


    async GetTodo(id: string, paginationOptions: PaginationOptions, paginationData: PaginationData) {
        try {
            let Per_Page = paginationOptions.getPageSize();

            let search = paginationOptions.getSearch();

            const skip = (Per_Page * (paginationOptions.getPage() - 1));

            let todos;
            if (search) {
                todos = await this.prisma.todo.findMany({
                    skip: skip,
                    take: Per_Page,
                    where: {
                        authorId: id,
                        body: {
                            contains: search,
                        }
                    },
                    orderBy: {
                        createdAt: 'asc',
                    }
                });
                paginationData.setItems(todos);
            }
            else {
                todos = await this.prisma.todo.findMany({
                    skip: skip,
                    take: Per_Page,
                    where: {
                        authorId: id,
                    },
                    orderBy: {
                        createdAt: 'asc',
                    }
                });
                paginationData.setItems(todos);
            }

            const result = { statusCode: 200, todo: paginationData };
            return result;
        }
        catch (error) {
            const result = { statusCode: 404, error: error };
            return result;
        }
    }
}