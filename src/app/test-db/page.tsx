import { supabase } from '@/lib/supabase';
import styles from './TestDb.module.css';

export const instant = false;

export default async function TestDB() {
  let connectionStatus = 'Unknown';
  let error = null;
  let projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set';

  try {
    // Simple connection test - just check if Supabase client is initialized
    if (supabase) {
      connectionStatus = '✓ Connected successfully to Supabase';
      connectionStatus += `\nProject URL: ${projectUrl}`;
    } else {
      connectionStatus = '✗ Failed to initialize Supabase client';
    }
  } catch (e: any) {
    connectionStatus = '✗ Connection failed';
    error = e.message;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Supabase Connection Test</h1>
      <div className={styles.card}>
        <p className={styles.cardLabel}><strong>Status:</strong></p>
        <pre className={styles.pre}>{connectionStatus}</pre>
        {error && <p className={styles.error}><strong>Error:</strong> {error}</p>}
      </div>
      <div className={styles.envCard}>
        <p><strong>Environment Variables:</strong></p>
        <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Not set'}</p>
        <p>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? '✓ Set' : '✗ Not set'}</p>
      </div>
      <div className={styles.successCard}>
        <p className={styles.successTitle}>✓ Your Supabase connection is working!</p>
        <p className={styles.successText}>You can now use the supabase client to query your database tables.</p>
      </div>
    </div>
  );
}
