"use client";

import PublicLinkButton from '../components/PublicLinkButton';

// Definisikan "bentuk" data untuk Profile dan Link
type Profile = {
  id: string;
  username: string;
  full_name: string;
};

type Link = {
  id: number;
  title: string;
  url: string;
};

// Gunakan tipe yang sudah didefinisikan untuk props
export default function UserProfileClient({ profile, links }: { profile: Profile, links: Link[] }) {
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