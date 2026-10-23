// src/api/tasksApi.js
// A trailing slash would turn every path into //api/tasks.
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '');

const UNEXPECTED_RESPONSE = 'Unexpected response from the TaskFlow API.';

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
    // A wrong base URL on Netlify returns index.html with a 200, which would
    // otherwise surface as a raw JSON SyntaxError.
    try {
      return await response.json();
    } catch {
      throw new Error(UNEXPECTED_RESPONSE);
    }
  }

  if (parse === 'text') {
    return response.text();
  }

  // Drain the empty body so the browser does not log the request as aborted.
  await response.text();
  return null;
}

function jsonBody(method, data) {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

export async function listTasks() {
  const tasks = await request('/api/tasks');

  if (!Array.isArray(tasks)) {
    throw new Error(UNEXPECTED_RESPONSE);
  }

  return tasks;
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
