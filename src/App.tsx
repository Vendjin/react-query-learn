import { useIsFetching, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetTodo, useGetTodo2, useTodos } from "./hooks/useTodos"
import { SyntheticEvent, useState } from "react";
import { TodoService } from "./services/todo.service";

function App() {
	const countFetching = useIsFetching() // количество раз сколько раз переобновление данных
	// можно использовать как проверку на загрузку

	// refetch - это примитивный способ обновления данных
	const { data, isLoading, refetch } = useTodos();
	// улучшенный способ обновления данных через queryClient
	const queryClient = useQueryClient()

	const { data: getId, isLoading: getIdLoading } = useGetTodo('1');
	const { data: detId2, isLoading: getIdLoading2 } = useGetTodo2(2);

	if (!getIdLoading) console.log(getId)
	if (!getIdLoading2) console.log(detId2)


	const [title, setTitle] = useState('')
	const { mutate } = useMutation(['create todo'],
		(title: string) => TodoService.create(title), {
		async onSuccess() {
			setTitle('')
			alert('ToDo created')
			await refetch()
		},
	})

	const submitHandler = (event: SyntheticEvent) => {
		event.preventDefault()
		mutate(title)
	}

	return (
		<div style={{
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '20px'
		}}>
			<div>
				<h2>Create Todo {countFetching}</h2>
				<form onSubmit={submitHandler}>
					<input type="text"
						onChange={event => setTitle(event.target.value)}
						value={title}
						placeholder="Enter todo"
					/>
					<button type="submit">create todo</button>
				</form>
			</div>
			<div>
				<h1>Todos: </h1>
				{/* <button onClick={() => refetch()}>Refetch</button> */}
				<button onClick={() => queryClient.invalidateQueries(['todos'])}>Refetch</button>

				{isLoading ? (
					<div>Loading</div>
				) : data?.length ? data.map(todo => (
					<div key={todo.id}><b>{todo.id}:</b> {todo.title}</div>
				))
					: (
						<h1>Data not Found</h1>
					)
				}
			</div>
		</div>
	)
}

export default App