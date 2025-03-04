import React, { useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/addTask';

function App() {
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  const addTask = (task) => {
    const newTasks = [... tasks, {text:task, completed: false}];
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i)=> {
      if (i === index) {
        return { ...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="list">
          <h1><span className="centralT">Meine To-Do-Liste</span></h1>
        </div>
        <AddTask onAdd={addTask}/>
        <ul>
          {tasks.map((task,index) => (
            <li key={index}>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)}/>
              <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>{task.text}</span>
              </li>
          ))}
        </ul>
      </header>
    </div>
  );
}
export default App;
