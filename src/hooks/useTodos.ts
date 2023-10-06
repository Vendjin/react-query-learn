import { useQuery } from "@tanstack/react-query"
import { TodoService } from "../services/todo.service"
import { AxiosRequestHeaders, AxiosResponse } from "axios"
import { ITodo } from "../app.interface"


export const useTodos = () => {
    return useQuery(['todos'], TodoService.getAll, {
        select: ({ data }) => data,
    })
}

/* хук с использованием данных по умолчанию, обязательно должны данные извне 
равны по типу данным в хуке */

const preData: AxiosResponse<ITodo[]> = {
    data: [
        {
            userId: 1,
            id: 1,
            title: 'hello',
            completed: false
        },
    ],
    status: 200,
    statusText: "OK",
    headers: {
        "Content-Type": "application/json",
    },
    config: { 
        headers: {} as AxiosRequestHeaders // Пустой объект headers в конфигурации
    }
};

export const useTodosWithInitialData = () => {
    return useQuery(['todos'], TodoService.getAll, {
        select: ({ data }) => data,
        // initialData() {return preData},
        initialData : preData
    })
}

// export const useGetTodo = (todoId: string) => {
//     return useQuery({
//         queryKey: ['todos', todoId],
//         queryFn: TodoService.getByID,
//         enabled: !!todoId,
//         select: data => data
//     })
// }


export const useGetTodo = (todoId: string) => {
    return useQuery(['todos', todoId], TodoService.getByID, {
        select: (data) => data,
        // enabled не будет выполняться пока не передадут todoId
        enabled: !!todoId
    })
}

export const useGetTodo2 = (todoId: number | string) => {
    return useQuery(
        ['todos', todoId],
        () => TodoService.getByID2(todoId.toString()), {
        select: (data) => data,
        enabled: !!todoId
    })
}
