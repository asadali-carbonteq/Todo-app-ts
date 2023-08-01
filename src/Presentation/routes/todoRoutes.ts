import express from "express"
import PrismaTodoController from "../../Application/Todo/TodoControllers"

const todoRouter = express.Router();

const controller: PrismaTodoController = new PrismaTodoController();

//todoRouter.get("/todo", controller.addTodo);
todoRouter.post("/todo/add", controller.addTodo);
todoRouter.delete("/todo/delete/:id", controller.deleteTodo);
todoRouter.put("/todo/update/:id", controller.updateTodo);

export default todoRouter;