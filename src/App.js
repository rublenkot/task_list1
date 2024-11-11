import React, { useState, useEffect } from 'react';
import './App.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // Додаємо стан для фільтра

  // Завантажуємо збережені завдання з локального сховища при першому завантаженні
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Зберігаємо завдання у локальне сховище при кожній зміні списку завдань
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Додавання нового завдання
  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  // Видалення завдання
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Зміна статусу виконання завдання
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Оновлений список завдань на основі вибраного фільтра
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // Якщо обрано фільтр "всі"
  });

  return (
    <div>
      <h1>Список завдань</h1>

      {/* Введення нового завдання */}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Нове завдання..."
      />
      <button onClick={addTask}>Додати</button>

      {/* Фільтрація завдань */}
      <div>
        <button onClick={() => setFilter('all')}>Усі</button>
        <button onClick={() => setFilter('completed')}>Виконані</button>
        <button onClick={() => setFilter('incomplete')}>Невиконані</button>
      </div>

      {/* Відображення списку завдань */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? 'Відмінити' : 'Завершити'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
