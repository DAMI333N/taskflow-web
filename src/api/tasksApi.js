// src/api/tasksApi.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}, parse = 'json') {
  if (!BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not set.');
  }

  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new Error('Could not reach the TaskFlow API.');
  }

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`.trim();

    // The API sends errors as { status, message, timestamp }.
    try {
      const body = await response.json();

      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Body was not JSON, keep the status line.
    }

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (parse === 'json') {
    return response.json();
  }

  if (parse === 'text') {
    return response.text();
  }

  return null;
}

function jsonBody(method, data) {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

export function listTasks() {
  return request('/api/tasks');
}

export function getTask(id) {
  return request(`/api/tasks/${encodeURIComponent(id)}`);
}

export function createTask(fields) {
  return request('/api/tasks', jsonBody('POST', fields));
}

export function updateTask(id, fields) {
  return request(`/api/tasks/${encodeURIComponent(id)}`, jsonBody('PUT', fields));
}

export function removeTask(id) {
  return request(`/api/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' }, 'none');
}

export function completeTask(id) {
  return request(`/api/tasks/${encodeURIComponent(id)}/complete`, { method: 'PUT' });
}

export function getSummary() {
  return request('/api/tasks/summary', {}, 'text');
}
