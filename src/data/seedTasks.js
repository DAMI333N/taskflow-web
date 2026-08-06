// src/data/seedTasks.js
export const seedTasks = [
  {
    id: 1,
    title: 'Set up project repository',
    description: 'Initialise a Git repo, add a .gitignore, and push the first commit.',
    status: 'done',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Design database schema',
    description: 'Draft the ERD for the contacts and deals tables.',
    status: 'done',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Build login page',
    description: 'Create a login form with email and password fields and basic validation.',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 4,
    title: 'Write unit tests for reducer',
    description: 'Cover ADD_TASK, DELETE_TASK, and SET_FILTER with at least two cases each.',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: 5,
    title: 'Update README',
    description: 'Add setup instructions, a screenshot, and a description of the tech stack.',
    status: 'todo',
    priority: 'low',
  },
  {
    id: 6,
    title: 'Deploy to Vercel',
    description: 'Connect the GitHub repo to Vercel and configure environment variables.',
    status: 'todo',
    priority: 'medium',
  },
];