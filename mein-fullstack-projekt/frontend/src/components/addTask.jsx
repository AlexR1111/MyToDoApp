import React, {useState} from 'react';

const AddTask = ({onAdd}) => {
    const [newTask, setNewTask] = useState('');
    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            onAdd(newTask);
            setNewTask('');
        }
    };

    return (
        <div className='list'>
            <input type='text' 
            placeholder='Neue Aufgabe' 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)}/>
            <button onClick={handleAddTask}>Hinzufügen</button>
        </div>
    );
};
export default AddTask;