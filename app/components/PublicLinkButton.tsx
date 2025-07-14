"use client";

type Link = {
  id: number;
  title: string;
  url: string;
};

export default function PublicLinkButton({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      // Ganti semua 'style' dengan 'className' dari Tailwind
      className="block w-full bg-indigo-600 text-white font-semibold text-center p-4 my-4 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition-transform"
    >
      {link.title}
    </a>
  );
}