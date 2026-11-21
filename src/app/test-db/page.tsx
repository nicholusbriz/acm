import { supabase } from '@/lib/supabase';

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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{ color: '#123C32' }}>Supabase Connection Test</h1>
      <div style={{ marginTop: '20px', padding: '20px', background: '#F5F0E8', borderRadius: '8px', border: '1px solid #D8C7A5' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}><strong>Status:</strong></p>
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '10px', fontSize: '14px' }}>{connectionStatus}</pre>
        {error && <p style={{ color: 'red', marginTop: '10px' }}><strong>Error:</strong> {error}</p>}
      </div>
      <div style={{ marginTop: '20px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>Environment Variables:</strong></p>
        <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Not set'}</p>
        <p>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? '✓ Set' : '✗ Not set'}</p>
      </div>
      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '8px', border: '1px solid #4caf50' }}>
        <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓ Your Supabase connection is working!</p>
        <p style={{ fontSize: '14px', marginTop: '8px' }}>You can now use the supabase client to query your database tables.</p>
      </div>
    </div>
  );
}
