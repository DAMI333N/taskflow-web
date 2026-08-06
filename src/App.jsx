// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import TaskListPage from './pages/TaskListPage.jsx';
import TaskDetailPage from './pages/TaskDetailPage.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </main>
    </div>
  );
}