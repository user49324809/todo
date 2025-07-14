import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [todos, setTodos] = useState([
    { text: 'Сделать уборку', done: false }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const completedTodos = todos.filter(todo => todo.done);
  const incompleteTodos = todos.filter(todo => !todo.done);
  const remainingCount = incompleteTodos.length;
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };
  const handleToggleDone = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };
  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ToDo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Введите задачу"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Добавить
        </button>
      </div>
      <p>Осталось невыполненных задач: {remainingCount}</p>
      <h4>Все задачи</h4>
      <ul className="list-group mb-3">
        {todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.done}
              onChange={() => handleToggleDone(index)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none', flex: 1 }}>
              {todo.text}
            </span>
            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteTodo(index)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <h4>Невыполненные задачи</h4>
      <ul className="list-group mb-3">
        {incompleteTodos.map((todo, index) => (
          <li key={index} className="list-group-item">{todo.text}</li>
        ))}
      </ul>
      <h4>Выполненные задачи</h4>
      <ul className="list-group mb-3">
        {completedTodos.map((todo, index) => (
          <li key={index} className="list-group-item">{todo.text}</li>
        ))}
      </ul>
      <button className="btn btn-warning" onClick={handleClearCompleted}>
        Очистить выполненные
      </button>
    </div>
  );
}
export default App;