import { Todo } from "./todo.components";

export class TodoList{
    constructor(
      public id: number,
      public name: string,
      public startDate: Date,
      public targetDate: Date,
      public isDone = false,
      public doneDate: Date | null,
      public todos: Todo[] | null,
    ){}
}