import { supabase } from '../../lib/supabaseClient';
import { notFound } from 'next/navigation';
import PublicLinkButton from '../components/PublicLinkButton';

// Kita tidak membuat 'type Props' terpisah, tapi langsung definisikan di sini.
export default async function UserProfile(props: { params: { username: string } }) {
  // Ambil username dari props.params
  const username = props.params.username;

  // 1. Cari profil pengguna berdasarkan username
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  // Jika profil tidak ditemukan, tampilkan halaman 404 Not Found
  if (!profile) {
    notFound();
  }

  // 2. Jika profil ditemukan, cari semua link milik pengguna tersebut
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', margin: '3rem auto', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>{profile.full_name || profile.username}</h1>
      <p>@{profile.username}</p>

      <div style={{ marginTop: '2rem' }}>
        {links && links.map(link => (
          <PublicLinkButton key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}