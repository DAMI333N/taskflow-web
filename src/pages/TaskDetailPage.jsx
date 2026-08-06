// src/pages/TaskDetailPage.jsx
import { useParams } from 'react-router-dom';

export default function TaskDetailPage() {
  const { id } = useParams();

  return <p>Task detail page placeholder, id: {id}</p>;
}