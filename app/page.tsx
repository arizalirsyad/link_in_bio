"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Dashboard from './components/Dashboard';
import type { Session } from '@supabase/supabase-js'; // <-- Impor tipe Session

export default function Home() {
  // Beri tahu useState bahwa state ini bisa Session atau null
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return (
      <div style={{ width: '100%', maxWidth: '420px', margin: '100px auto' }}>
        <p>Silakan Login atau Sign Up</p>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github', 'google']}
        />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', margin: '2rem auto', maxWidth: '800px' }}>
      <h2>Selamat Datang!</h2>
      <p>Anda login sebagai: <strong>{session.user.email}</strong></p>

      <Dashboard session={session} />

      <button 
        onClick={handleLogout}
        style={{ marginTop: '2rem', padding: '10px 20px', background: 'crimson', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}