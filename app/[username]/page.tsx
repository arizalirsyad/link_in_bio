import { supabase } from '../../lib/supabaseClient';
import { notFound } from 'next/navigation';
import PublicLinkButton from '../components/PublicLinkButton'; // <-- 1. Import komponen baru

export default async function UserProfile({ params }) {
  const username = params.username;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (!profile) {
    notFound();
  }

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
          // 2. Ganti tag <a> dengan komponen baru
          <PublicLinkButton key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}