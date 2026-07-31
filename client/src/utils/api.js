// Frontend API Communication Layer with Graceful Fallback

const BASE_URL = '/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('km_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`⚠️ Network fetch to ${endpoint} failed.`);
    return { success: false, offline: true, message: 'Server operating in offline mode.' };
  }
};
