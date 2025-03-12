const API_URL = "https://promanage-alpha-eight.vercel.app/api/auth";
const API_URL_PROJECT = "https://promanage-alpha-eight.vercel.app/api/projects";
const API_URL_TASK = "https://promanage-alpha-eight.vercel.app/api/tasks";

// const API_URL = "http://localhost:5000/api/auth";
// const API_URL_PROJECT = "http://localhost:5000/api/projects";
// const API_URL_TASK = "http://localhost:5000/api/tasks";
//Auth
export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/getUserById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const getUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/non-admins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
//Project
export const createProject = async (projectData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_PROJECT}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const updateProject = async (id, projectData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_PROJECT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const deleteProject = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_PROJECT}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getProjects = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_PROJECT}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
export const getProject = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_PROJECT}/getById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Task
export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_TASK}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return response.json();
};

export const updateTask = async (id, taskData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_TASK}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return response.json();
};

export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_TASK}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getTasks = async (projectId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_TASK}/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getTask = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_TASK}/getById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const assignTask = async (taskId, userId, projectId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL_TASK}/assign-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ taskId, userId, projectId }),
  });
  return response.json();
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await fetch(`${API_URL_TASK}/${taskId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du statut");
  }

  return await response.json();
};
