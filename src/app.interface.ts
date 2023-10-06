export interface ITodo {
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean
  }
  
  // наследуемся от ITodo кроме поля id  
  export interface ICreateToDo extends Omit<ITodo, 'id'> {}