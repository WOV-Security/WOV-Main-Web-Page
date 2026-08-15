const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export async function fetchSolutions() {
  const response = await fetch(`${API_BASE}/api/solutions`);
  if (!response.ok) throw new Error('Failed to load solutions');
  return response.json();
}

export async function fetchSolutionBySlug(slug) {
  const response = await fetch(`${API_BASE}/api/solutions/${slug}`);
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

export async function createSolution(payload) {
  const response = await fetch(`${API_BASE}/api/solutions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to create solution');
  return response.json();
}

export async function updateSolution(id, payload) {
  const response = await fetch(`${API_BASE}/api/solutions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to update solution');
  return response.json();
}

export async function deleteSolution(id) {
  const response = await fetch(`${API_BASE}/api/solutions/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete solution');
}

export async function createRelease(payload) {
  const response = await fetch(`${API_BASE}/api/releases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to create release');
  return response.json();
}

export async function deleteRelease(id) {
  const response = await fetch(`${API_BASE}/api/releases/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete release');
}

export async function createClient(payload) {
  const response = await fetch(`${API_BASE}/api/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Failed to create client');
  return response.json();
}

export async function deleteClient(id) {
  const response = await fetch(`${API_BASE}/api/clients/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete client');
}
