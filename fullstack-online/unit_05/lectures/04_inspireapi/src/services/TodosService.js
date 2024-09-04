import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TodosService {



  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }
  async getMyTodos(userId) {
    const todos = await dbContext.Todos.find({ creatorId: userId })
    return todos
  }
  async getTodoById(todoId, userId) {
    const todo = await dbContext.Todos.findById(todoId)
    if (todo == null) throw new BadRequest(`no todo at id: ${todoId}`)
    if (todo.creatorId != userId) throw new Forbidden("That is not yours!")

    return todo
  }

  async updateTodo(updateData, userId) {
    // const todoOriginal = await dbContext.Todos.findById(updateData.id)
    const todoOriginal = await this.getTodoById(updateData.id, userId)
    todoOriginal.description = updateData.description ?? todoOriginal.description
    todoOriginal.completed = updateData.completed ?? todoOriginal.completed
    await todoOriginal.save()
    return todoOriginal
  }

  async deleteTodo(todoId, userId) {
    const todoToDelete = await this.getTodoById(todoId, userId)
    await todoToDelete.deleteOne()
    return `${todoToDelete.description} was removed.`
  }
}

export const todosService = new TodosService()
