/**
 * @description  Here, we first need to import some types from express because I want to type the values explicitly. If you want, you can let TypeScript infer it for you.
 */
import { Response, Request } from "express"
import { ITodo } from "./../../types/todo"
import Todo from "../../models/todo"

/**
 * @description getTodos()
 * used to fetch data. 
 * receives a req and res parameter and returns a promise. 
 * With the help of the Todo model created earlier, we can now get data from MongoDB and return a response with the array of todos.
 * 
 * @param req 
 * @param res 
 */
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
}

/**
 * @description addTodo()
 * receives body object that contains data entered by the user
 * then use typecasting to avoid typos and restrict the body variable to match ITodo
 * then create new Todo based on the model
 * 
 * With this we can now save the todo in the db, and return response that contains the todo created and the updated todos array.
 * 
 * @param req 
 * @param res 
 */
const addTodo = async (req: Request, res:Response): Promise<void>=>{
  try{
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res
    .status(201)
    .json({message:"Todo added", todo:newTodo, todos:allTodos});
  }catch(error) {
    throw error;
  }
}

/**
 * @description
 * To update a todo, we need to extract id and the body from the req object, then pass them to findByIdAndUpdate()
 * This utility will find todo on db and update it
 * once successful, we can return the updated data to the user
 * 
 * @param req 
 * @param res 
 */
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try{
    const {params:{id},body} = req;

    const updateTodo:ITodo | null = await Todo.findByIdAndUpdate({_id:id},body);

    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
      message:"Todo updated",
      todo:updateTodo,
      todos:allTodos
    });
  }catch(error){
    throw error;
  }
}

/**
 * @description
 * deletes todo from db
 * pull out id from req and pass it as an argument to findByIdAndRemove() to access corresponding todo and delete it from db
 * 
 * @param req 
 * @param res 
 */

const deleteTodo = async (req: Request, res: Response): Promise<void>=>{
  try{
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);

    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message:"Todo deleted",
      todo:deletedTodo,
      todos:allTodos
    });
  }catch(error){
    throw error;
  }
}

/**
 * @description export the functions to be able to use them in other files.
 */
export{
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
}

