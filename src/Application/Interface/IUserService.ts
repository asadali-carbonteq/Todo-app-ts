import { Request, Response } from "express";

export default interface IUserService {
    createUser(req: Request, res: Response): Promise<any>;
    deleteUser(req: Request, res: Response): Promise<any>;
    updateUser(req: Request, res: Response): Promise<any>;
}