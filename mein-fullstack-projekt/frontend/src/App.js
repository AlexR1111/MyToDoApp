import React, { useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/addTask';


function App() {
  
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data.tasks))
      .catch(error => console.error('Error:', error));
  }, []);

  const saveTaskToDatabase = (task) => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  };
  
  const addTask = (task) => {
    const newTask = { text: task, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTaskToDatabase(newTask);
  };

  const toggleTaskCompletion = (index) => {
    const taskToToggle = tasks[index];
    const newTasks = tasks.map((task, i)=> {
      if (i === index) {
        return { ...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(newTasks);
  if (!taskToToggle.completed) {
    fetch(`http://localhost:5000/api/tasks/${taskToToggle.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  }
};

  return (
    <div className="App">
      <header className="App-header">
        <div id="list">
          <h1><span className="centralT">Meine To-Do-Liste</span></h1>
                <AddTask onAdd={addTask}/>
                 <ul>
          {tasks.map((task,index) => (
            <li key={index}>
               <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(index)}/>
              <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>{task.text}</span>
              </li>
          ))}
        </ul>
        </div>
      </header>
    </div>
  );
}
export default App;
