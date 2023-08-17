import { PrismaClient } from "@prisma/client";
import { User } from "../../Domain/User";
const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";
import { UserAlreadyExistException, UserDoNotExistException } from "../Error/RepositoryError";
import { injectable } from "inversify";
import prisma from "../../libs/prisma";
const SECRET_KEY = "Hello_World";


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

            const result = { user: existingUser, token: token, message: "User SignIn Successful" };
            return result;
        }
        catch (error) {
            const result = { statuscode: 400, error: error, message: "Signin Failed" };
            return result;
        }
    }

    async CreateUser(user: User) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email: user.getEmail(),
                }
            });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(user.getPassword(), 10);

                const createdUser = await this.prisma.user.create({
                    data: {
                        user_id: user.getId(),
                        email: user.getEmail(),
                        name: user.getName(),
                        password: hashedPassword,
                    }
                });

                const token = jwt.sign({ email: user.getEmail(), id: user.getId() }, SECRET_KEY);
                console.log(token);
                const result = [{ user: createdUser, token: token, message: "New User Created" }];

                return result;
            } else {
                return new UserAlreadyExistException("The user with this email already exists.");
            }
        }
        catch (error) {
            const result = [{ statuscode: 400, error: error, message: "Signin Failed" }];
            return result;
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
            return updatedUser;
        }
        catch (error) {
            return error;
        }
    }

}