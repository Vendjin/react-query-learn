import { useQuery } from "@tanstack/react-query"
import { TodoService } from "./services/todo.service"

function App() {
  const todoId = 1

  const { data, isLoading } = useQuery(['todos'], TodoService.getAll, {
    select: ({ data }) => data,
    onSuccess(data) {
      alert(data[0].title)
    },
    onError(err) {
      alert(`Тут текст ошибки ${err}`)
    },
    // отложенный запрос пока значение не станет true (перевести значение в boolean можно с помощь !! )
    enabled: todoId === 1,
    // количество раз сколько сделает запросов прежде чем появится ошибка
    retry: 10
  })

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : data?.length ? data.map(todo => (
        <div key={todo.id}><b>{todo.id}:</b> {todo.title}</div>
      ))
        : (
          <h1>Data not Found</h1>
        )
      }
    </>
  )
}

export default App
