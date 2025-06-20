export async function authenticateUser(username, password) {
  try {
    const res = await fetch(
      `http://localhost:3001/users?username=${username}&password=${password}`
    );
    const users = await res.json();
    if (users.length > 0) {
      const user = users[0];
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error authenticating:', error);
    return false;
  }
}

export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('user'));
  }
  return null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}
