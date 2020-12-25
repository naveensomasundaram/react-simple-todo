import react, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import './Todo.css';
import db from './firebase';
import firebase from 'firebase';

function App() {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // setTodos(snapshot.docs.map(doc => doc.data().todo));
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
        });
    }, [])

    const addTodo = (event) => {
        if (inputValue != "") {
            event.preventDefault();

            db.collection("todos").add({ 
                todo: inputValue,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // setTodos([...todos, inputValue]);
            setInputValue('');
        }
    }

    return (<div>
        <h1 className="text-align-center">Simple React Appppp</h1>
        <h1 className="text-align-center">React + FireBase + Simple Todo App</h1>        
        <form className="text-align-center">
            <FormControl >
                <InputLabel>Write a Todo:</InputLabel>
                <Input value={inputValue} onChange={event => setInputValue(event.target.value)} aria-describedby="my-helper-text" />
                <Button variant="contained" color="primary" type="submit" onClick={addTodo} disabled={!inputValue}>  Add Todo </Button>
            </FormControl>
        </form>
        <ul>
            {todos.map((todo, index) => (
              <Todo key={index} todo={todo}/>
            ))}
        </ul>
    </div>)
}

export default App;