// src/components/AddTaskForm.jsx
import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';

const EMPTY_FORM = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
};

export default function AddTaskForm() {
  const { addTask } = useTasks();
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.title.trim() === '') {
      return;
    }

    addTask({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
    });

    setForm(EMPTY_FORM);
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>Add a task</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        rows="3"
        value={form.description}
        onChange={handleChange}
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}