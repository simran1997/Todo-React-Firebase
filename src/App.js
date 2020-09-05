import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Task from "./Task";
import { db } from "./Firebase";
import firebase from 'firebase';

function App() {
  // const [todos, setTodos] = useState(["First Task", "Second Task"]);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when app loads we need to listen to the database and fetch new todos as they are added/removed
  useEffect(() => {
    //this code fires when App.js loads
    db.collection('todos').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, text: doc.data().text})));
    })
  }, [])

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //setTodos([...todos, input]);    -> It is used for handling local data of todo previously
    setInput("");
  };

  return (
    <div className="App">
      <h1>Todo React App 📓 with Firebase 🔥</h1>
      <form>
        {/* <input value={input} onChange={event => setInput(event.target.value)}/> */}

        <FormControl>
          <InputLabel>Enter a task...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          ➕Add Task
        </Button>
        {/* <button type="submit" onClick={addTodo}>➕Add Task</button> */}
      </form>
      <ul>
        {todos.map((todo) => (
          <Task td={todo}/>
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
