import { useQuery } from "@tanstack/react-query"

function App() {
  const todoId = 1

  const { data } = useQuery(['todos', todoId],
    () => fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
  )

  return (
    <>
      {data ?
        <h1>Todo: {data.title}</h1>
        : <h1>Data not Found</h1>
      }
    </>
  )
}

export default App
