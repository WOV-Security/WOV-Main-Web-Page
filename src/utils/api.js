const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://wov-backend.wov-backend.workers.dev';

export async function fetchSolutions() {
  const response = await fetch(`${API_BASE}/api/solutions`);
  if (!response.ok) throw new Error('Failed to load solutions');
  return response.json();
}

export async function fetchSolutionBySlug(slug) {
  const response = await fetch(`${API_BASE}/api/solutions/slug/${slug}`);
  if (!response.ok) throw new Error('Solution not found');
  return response.json();
}

export async function fetchReleases() {
  const response = await fetch(`${API_BASE}/api/releases`);
  if (!response.ok) throw new Error('Failed to load releases');
  return response.json();
}

export async function fetchClients() {
  const response = await fetch(`${API_BASE}/api/clients`);
  if (!response.ok) throw new Error('Failed to load clients');
  return response.json();
}

export async function fetchHomeProjects() {
  const response = await fetch(`${API_BASE}/api/home-projects`);
  if (!response.ok) throw new Error('Failed to load projects');
  return response.json();
}

export async function fetchSettings() {
  const response = await fetch(`${API_BASE}/api/settings`);
  if (!response.ok) throw new Error('Failed to load settings');
  return response.json();
}

