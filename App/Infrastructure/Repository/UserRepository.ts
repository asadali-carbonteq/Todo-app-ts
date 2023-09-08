import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";
import { InvalidCredentialException, UserAlreadyExistException, UserDoNotExistException } from "../Error/RepositoryError";
import { injectable } from "inversify";
import prisma from "../Database/prisma";
import secret from "../Config/secretKey";
import IUserRepository from "../../Domain/IRepositories/User/IUserRepository";


@injectable()
export default class UserRepository implements IUserRepository {
    private prisma: PrismaClient;


    constructor() {
        this.prisma = prisma;
    }



    async SignIn(email: string, password: string) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!existingUser) {
                throw new UserDoNotExistException("User Do Not Exist");
            }

            const matchPassword = await bcrypt.compare(password, existingUser.password);
            if (!matchPassword) {
                throw new InvalidCredentialException("User Email or Password incorrect");
            }

            const token = jwt.sign({ email: existingUser.email, id: existingUser.user_id }, secret.SECRET_KEY);

            const result = { statusCode: 200, user: existingUser, token: token };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error };
            return result;
        }
    }



    async CreateUser(uuid: string, email: string, name: string, password: string) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email: email,
                }
            });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(password, 10);

                const createdUser = await this.prisma.user.create({
                    data: {
                        user_id: uuid,
                        email: email,
                        name: name,
                        password: hashedPassword,
                    }
                });

                const token = jwt.sign({ email: email, id: uuid }, secret.SECRET_KEY);

                const result = { statusCode: 201, user: createdUser, token: token };
                return result;
            } else {
                throw new UserAlreadyExistException("The user with this email already exists.");
            }
        }
        catch (error) {
            const result = { statusCode: 400, error: error };
            return result;
        }
    }



    async DeleteUser(id: string) {
        try {
            //Before deleting the user, all the todos need to be deleted. Deleting all user todos...
            const deletedTodos = await this.prisma.todo.deleteMany({
                where: {
                    authorId: id,
                }
            })

            const deletedUser = await this.prisma.user.delete({
                where: {
                    user_id: id,
                }
            })

            const result = { statusCode: 201, user: deletedUser };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error };
            return result;
        }
    }



    async UpdateUser(id: string, name: string, email: string, password: string) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedUser = await this.prisma.user.update({
                where: {
                    user_id: id,
                },
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                }
            })

            const result = { statusCode: 201, user: updatedUser };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error };
            return result;
        }
    }

}