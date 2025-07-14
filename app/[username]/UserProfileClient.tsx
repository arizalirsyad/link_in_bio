"use client";
import PublicLinkButton from '../components/PublicLinkButton';
import Image from 'next/image'; // <-- Impor komponen Image

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

export default function UserProfileClient({ profile, links }: Props) {
  return (
    <div className="container mx-auto max-w-2xl text-center px-4 py-8 mt-12">

      {/* Tambahkan Foto Profil di sini */}
      <Image
        src="https://placehold.co/100x100/E2E8F0/4A5568?text=AVATAR" // Placeholder avatar
        alt="Foto Profil"
        width={100}
        height={100}
        className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
      />

      <h1 className="text-3xl font-bold text-gray-800">
        {profile.full_name || profile.username}
      </h1>
      <p className="text-md text-gray-500 mb-8">
        @{profile.username}
      </p>

      <div>
        {links && links.map(link => (
          <PublicLinkButton key={link.id} link={link} />
        ))}
      </div>

      {/* Tambahkan Footer di sini */}
      <footer className="text-center text-sm text-gray-500 mt-12">
        Dibuat dengan Next.js & Supabase
      </footer>
    </div>
  );
}