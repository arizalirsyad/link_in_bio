"use client"; // <-- Komponen ini interaktif di client

import PublicLinkButton from '../components/PublicLinkButton';

// Komponen ini hanya menerima data yang sudah jadi, lalu menampilkannya.
export default function UserProfileClient({ profile, links }) {
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