import React, { useState, useEffect, useReducer, useRef, type SyntheticEvent } from 'react';

// 1. Define the shape of a single task
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

// 2. Define the Action types for useReducer
type Action = 
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: number }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'LOAD_TASKS'; payload: Task[]}

// 3. useReducer Setup: Logic for complex state changes
const taskReducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, {id: Date.now(), text: action.payload, completed: false}];
        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed }: task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'LOAD_TASKS':
            return action.payload;
        default:
            return state;
    }
}

const TaskApp: React.FC = () => {
    // useReducer take the reducer function and the initial state (empty array of Task)
    const [tasks, dispatch] = useReducer(taskReducer, [] as Task[]);

    // useState inferred as string
    const [inputValue, setInputValue] = useState<string>('');

    // useRef for the HTML input element
    const inputRef = useRef<HTMLInputElement | null> (null);

    // useRef for a mutable number (timer)
    const timerRef = useRef<number>(0);

    useEffect(() => {
        const savedData = localStorage.getItem('myTasks');
        if (savedData) {
            try {
                const parsedTasks: Task[] = JSON.parse(savedData);
                dispatch({ type: 'LOAD_TASKS', payload: parsedTasks });
            } catch (e) {
                console.error("Failed to parse tasks", e);
            }
        }

        const interval = setInterval(() => {
            timerRef.current += 1;
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }, [tasks])

    const handleAddTask = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        dispatch({ type: 'ADD_TASK', payload: inputValue });
        setInputValue('');

        inputRef.current?.focus();
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto'}}>
            <h2>Task Dashboard</h2>

            <form onSubmit={handleAddTask}>
                <input ref={inputRef} type="text" value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    placeholder='What needs to be done?'
                />
                <button type='submit'>Add</button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0}}>
                {tasks.map((task: Task) => (
                    <li key={task.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between'}}>
                        <span
                            onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id})}
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                                flexGrow: 1
                            }}>
                            {task.text}
                        </span>
                        <button onClick={() => dispatch({type: 'DELETE_TASK', payload: task.id})}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '20px'}}>
                Session seconds: {timerRef.current}
            </p>
        </div>
    )
};

export default TaskApp;