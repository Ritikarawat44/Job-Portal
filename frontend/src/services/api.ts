// src/services/api.ts

const BASE_URL = "http://localhost:8080/api";
const API_BASE = `${BASE_URL}/jobs`;
const APP_BASE = `${BASE_URL}/applications`;
const USER_BASE = `${BASE_URL}/users`;

// ✅ Helper to attach JWT token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// =====================
// ✅ Type Definitions
// =====================

export type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  company: string;
  postedByEmail: string;
};

export type Application = {
  id?: number;
  userId: number;
  jobId: number;
  appliedAt?: string;
  status?: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: "CANDIDATE" | "RECRUITER";
};

// =====================
// ✅ Job Endpoints
// =====================

// 🔍 Search jobs
export const searchJobs = async (q: string, location: string): Promise<Job[]> => {
  const params = new URLSearchParams();
  if (q?.trim()) params.append("q", q.trim());
  if (location?.trim()) params.append("location", location.trim());

  const res = await fetch(`${API_BASE}/search?${params}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
};

// 📄 Get all jobs
export const getAllJobs = async (): Promise<Job[]> => {
  const res = await fetch(`${API_BASE}/all`);
  if (!res.ok) throw new Error("Failed to load jobs");
  return res.json();
};

// 🧾 Get job by ID
export const getJobById = async (id: number): Promise<Job> => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Job not found");
  return res.json();
};

// 🧑‍💼 Post a new job (Recruiter only)
export const postJob = async (job: Omit<Job, "id">): Promise<Job> => {
  const res = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(job),
  });

  if (!res.ok) {
    if (res.status === 403) throw new Error("Unauthorized: Only Recruiters can post jobs");
    throw new Error("Failed to post job");
  }

  return res.json();
};

// 📋 Get recruiter’s jobs
export const getRecruiterJobs = async (email: string): Promise<Job[]> => {
  const res = await fetch(`${API_BASE}/recruiter/${encodeURIComponent(email)}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load your jobs");
  return res.json();
};

// =====================
// ✅ Application Endpoints
// =====================

// 📝 Apply for a job (Candidate only)
export const applyToJob = async (userId: number, jobId: number): Promise<Application> => {
  const res = await fetch(`${APP_BASE}/apply`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId, jobId }),
  });

  if (!res.ok) {
    if (res.status === 403) throw new Error("Unauthorized: Only Candidates can apply for jobs");
    throw new Error("Failed to apply for the job");
  }

  return res.json();
};

// =====================
// ✅ User Authentication
// =====================

// 🔐 Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  const res = await fetch(`${USER_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();

  // ✅ Store token & user locally
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

// 🧾 Register user
export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role: "CANDIDATE" | "RECRUITER";
}): Promise<User> => {
  const res = await fetch(`${USER_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Registration failed");
  }

  return res.json();
};

// 🧹 Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
