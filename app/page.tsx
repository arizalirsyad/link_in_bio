"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function Home() {
  // State untuk menyimpan sesi login pengguna
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Ambil sesi yang sedang berjalan saat komponen dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Buat "listener" untuk memantau perubahan status login
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Hentikan listener saat komponen tidak lagi ditampilkan
    return () => subscription.unsubscribe();
  }, []);

  // Fungsi untuk logout
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  // Jika TIDAK ADA sesi (belum login)
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

  // Jika ADA sesi (sudah login)
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '5rem' }}>
      <h2>Selamat Datang!</h2>
      <p>Anda login sebagai: <strong>{session.user.email}</strong></p>
      
      {/* Di sini nanti kita akan menampilkan link-link milik pengguna */}
      <div style={{ margin: '2rem 0', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p>(Dasbor untuk link akan muncul di sini)</p>
      </div>

      <button 
        onClick={handleLogout}
        style={{ padding: '10px 20px', background: 'crimson', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}