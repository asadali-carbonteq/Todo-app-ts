import { Request, Response } from "express";


export default interface ITodoService {
    getTodo(req: Request, res: Response): Promise<any>;
    addTodo(req: Request, res: Response): Promise<any>;
    updateTodo(req: Request, res: Response): Promise<any>;
    deleteTodo(req: Request, res: Response): Promise<any>;
}