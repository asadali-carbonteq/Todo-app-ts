import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";
import { UserAlreadyExistException, UserDoNotExistException } from "../Error/RepositoryError";
import { injectable } from "inversify";
import prisma from "../../libs/prisma";
require('dotenv').config();



const SECRET_KEY = process.env.SECRET_KEY as string;


@injectable()
export default class UserRepository {
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
                return new UserDoNotExistException("User Email or Password incorrect");
            }

            const token = jwt.sign({ email: existingUser.email, id: existingUser.user_id }, SECRET_KEY);

            const result = { statusCode: 201, user: existingUser, token: token, message: "User SignIn Successful" };
            return result;
        }
        catch (error) {
            const result = { statusCode: 400, error: error, message: "Signin Failed" };
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

                const token = jwt.sign({ email: email, id: uuid }, SECRET_KEY);

                const result = [{ statusCode: 201, user: createdUser, token: token, message: "New User Created" }];
                return result;
            } else {
                return new UserAlreadyExistException("The user with this email already exists.");
            }
        }
        catch (error) {
            const result = [{ statusCode: 400, error: error, message: "Signin Failed" }];
            return result;
        }
    }



    async DeleteUser(id: string) {
        try {
            //Before deleting the user, all the todos need to be deleted. Deleting all user todos...
            const deletedTodo = await this.prisma.todo.deleteMany({
                where: {
                    authorId: id,
                }
            })

            const deletedUser = await this.prisma.user.delete({
                where: {
                    user_id: id,
                }
            })

            const result = [{ statusCode: 201, user: deletedUser, message: "User Deleted" }];
            return result;
        }
        catch (error) {
            const result = [{ statusCode: 400, error: error, message: "User Deletion Failed" }];
            return result;
        }
    }



    async UpdateUser(id: string, name: string, email: string, password: string) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    user_id: id,
                },
                data: {
                    name: name,
                    email: email,
                    password: password,
                }
            })

            const result = [{ statusCode: 201, user: updatedUser, message: "User Updated" }];
            return result;
        }
        catch (error) {
            const result = [{ statusCode: 400, error: error, message: "User Updation Failed" }];
            return result;
        }
    }

}