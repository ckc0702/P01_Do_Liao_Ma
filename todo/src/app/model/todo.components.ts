import { TodoList } from "./todolist.components";
import { User } from "./user.components";

export class Todo{
    constructor(
      public id: number,
      public description: string,
      public startDate: Date,
      public targetDate: Date,
      public isDone = false,
      public doneDate : Date | null,
      // public todoList : TodoList | null,
      // public user : User,
    ){}
}