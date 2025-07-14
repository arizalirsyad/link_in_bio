"use client";

// Definisikan bentuk 'link' yang diterima komponen ini
type Link = {
  id: number;
  title: string;
  url: string;
};

// Gunakan tipe yang sudah didefinisikan untuk props
export default function PublicLinkButton({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        background: '#007bff',
        color: 'white',
        textDecoration: 'none',
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: '8px',
        fontWeight: 'bold',
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {link.title}
    </a>
  );
}