'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser } from '../../lib/auth';
import styles from '../../styles/SignIn.module.css';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username dan password tidak boleh kosong');
      return;
    }
    const success = await authenticateUser(username, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
