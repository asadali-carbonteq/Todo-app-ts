import { PrismaClient, Todo } from "@prisma/client";

interface TodoController{
    addTodo: (todo : TodoInput) => Promise<Todo>;
    deleteTodo: (id: string) => Promise<void>;
    updateTodo: (id: string, text: string) => Promise<Todo>;
}

interface TodoInput{
    body: string,
    authorId: string
}

export default class PrismaTodoController implements TodoController{
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async addTodo(todo: TodoInput): Promise<Todo> {
        const newTodo = await this.prisma.todo.create({
            data:{
                body: todo.body,
                author:{
                    connect:{
                        id: todo.authorId
                    }
                }
            }
        })
        return newTodo;
    }   

    async updateTodo(todoId: string, text: string): Promise<Todo>{
        const update_Todo = await this.prisma.todo.update({
            where:{
                id : todoId,
            },
            data:{
                body: text,
            }
        });
        return update_Todo;
    }

    async deleteTodo(todoId: string) : Promise<void>{
        const deleteTodo = await this.prisma.todo.delete({
            where:{
                id: todoId,
            }
        });
        console.log(deleteTodo);
    }

}

const newTodoController: PrismaTodoController = new PrismaTodoController;

