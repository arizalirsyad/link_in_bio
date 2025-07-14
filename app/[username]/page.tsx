import { supabase } from '../../lib/supabaseClient';
import { notFound } from 'next/navigation';
import UserProfileClient from './UserProfileClient';

// Tipe untuk props halaman
type PageProps = {
  params: {
    username: string;
  };
};

// Halaman ini HANYA mengambil data
export default async function UserProfilePage({ params }: PageProps) {
  const { username } = params;

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

  // Lempar data ke komponen client untuk ditampilkan
  return <UserProfileClient profile={profile} links={links || []} />;
}