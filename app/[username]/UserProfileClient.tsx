"use client";
import PublicLinkButton from '../components/PublicLinkButton';

// Definisikan tipe untuk data yang diterima
type Profile = {
  username: string;
  full_name?: string | null;
};

type Link = {
  id: number;
  title: string;
  url: string;
};

type Props = {
  profile: Profile;
  links: Link[];
};

// Komponen ini hanya menerima data yang sudah jadi, lalu menampilkannya
export default function UserProfileClient({ profile, links }: Props) {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', margin: '3rem auto', maxWidth: '600px' }}>
      <h1>{profile.full_name || profile.username}</h1>
      <p>@{profile.username}</p>

      <div style={{ marginTop: '2rem' }}>
        {links && links.map(link => (
          <PublicLinkButton key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}