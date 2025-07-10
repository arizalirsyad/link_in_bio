import { supabase } from '../../lib/supabaseClient';
import { notFound } from 'next/navigation';
import UserProfileClient from './UserProfileClient'; // <-- Impor komponen baru

// Tipe ini kita gunakan di sini
type Props = {
  params: {
    username: string;
  };
};

// Halaman ini sekarang HANYA mengambil data
export default async function UserProfilePage({ params }: Props) {
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

  // Setelah data didapat, kita lempar ke komponen client untuk ditampilkan
  return <UserProfileClient profile={profile} links={links} />;
}