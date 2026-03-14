/**
 * Backend API base URL.
 * - Empty in dev: use relative /api (Vite proxy forwards to local or VITE_PROXY_TARGET).
 * - Set VITE_API_BASE_URL in production build (e.g. https://lms-mern-aaj1.onrender.com).
 */
export const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
