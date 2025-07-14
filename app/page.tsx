"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Dashboard from './components/Dashboard';
import type { Session } from '@supabase/supabase-js';

export default function Home() {
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

  // Jika belum login, tampilkan form Auth
  if (!session) {
    return (
      // Styling menggunakan Tailwind
      <div className="container mx-auto max-w-md p-8 mt-20">
        <p className="text-center mb-4">Silakan Login atau Sign Up</p>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github', 'google']}
        />
      </div>
    );
  }

  // Jika sudah login, tampilkan dasbor
  return (
    // Styling menggunakan Tailwind
    <main className="container mx-auto max-w-4xl p-4 text-center mt-8">
      <h2 className="text-2xl font-semibold">Selamat Datang!</h2>
      <p className="text-gray-600 mb-6">
        Anda login sebagai: <strong>{session.user.email}</strong>
      </p>
      
      <Dashboard session={session} />

      <button 
        onClick={handleLogout}
        // Kelas-kelas Tailwind untuk tombol
        className="mt-8 px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </main>
  );
}