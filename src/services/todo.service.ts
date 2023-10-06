import axios from "axios"
import { ICreateToDo, ITodo } from "../app.interface"
import { QueryFunctionContext } from "@tanstack/react-query";

const url = 'https://jsonplaceholder.typicode.com/todos';

export const TodoService = {
    getAll: async () => {
        return axios.get<ITodo[]>(`${url}/?_start=0&_limit=5`)
    },
    getByID: async (ctx: QueryFunctionContext) => {
        const [_, todoId] = ctx.queryKey;
        const { data } = await axios.get<ITodo>(`${url}/${todoId}`)
        return data;
    },
    getByID2: async (todoId: string) => {
        const { data } = await axios.get<ITodo>(`${url}/${todoId}`)
        return data;
    },

    create: async (title: string) => {
        return axios.post<any, ICreateToDo>(url, {
            title,
            userId: 1123123213,
            completed: false
        })
    }
}

class TodoServiceClass {
    private URL = 'https://jsonplaceholder.typicode.com';

    async getAll() {
        return axios.get<ITodo[]>(`${this.URL}/todos`)
    }

    async getByID(id: string | number) {
        return axios.get<ITodo>(`${this.URL}/todos/${id}`)
    }
}

export default new TodoServiceClass();