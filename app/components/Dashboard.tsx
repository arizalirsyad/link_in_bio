"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

// Definisikan tipe untuk satu objek Link
type Link = {
  id: number;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
};

// Gunakan tipe Session untuk mendefinisikan props
export default function Dashboard({ session }: { session: Session }) {
  // Beri tahu useState bahwa ini adalah array dari Link
  const [links, setLinks] = useState<Link[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const { user } = session;

  // Fungsi untuk mengambil data dari Supabase
  const getLinks = async () => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching links:', error);
    } else {
      setLinks(data || []);
    }
  };

  // Gunakan useEffect untuk memanggil getLinks saat komponen dimuat
  useEffect(() => {
    getLinks();
  }, [user]);

  // Fungsi untuk menambah link baru
  const handleAddLink = async () => {
    if (newTitle.trim() === '' || newUrl.trim() === '') return;

    const { data, error } = await supabase
      .from('links')
      .insert([{ title: newTitle, url: newUrl, user_id: user.id }])
      .select(); // Meminta Supabase mengembalikan data yang baru dibuat

    if (error) {
      console.error('Error adding link:', error);
    } else if (data) {
      // Optimistic UI: langsung tambahkan ke state tanpa fetch ulang
      setLinks([...links, data[0]]);
      setNewTitle('');
      setNewUrl('');
    }
  };
  
  // Fungsi untuk menghapus link
  const handleDeleteLink = async (id: number) => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting link:', error);
    } else {
      setLinks(links.filter((link) => link.id !== id));
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1.5rem', marginTop: '1rem', borderRadius: '8px' }}>
      <h4>Kelola Link Anda</h4>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Judul Link (mis: Portfolio)"
          style={{ padding: '8px', flexGrow: 1 }}
        />
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://..."
          style={{ padding: '8px', flexGrow: 2 }}
        />
        <button onClick={handleAddLink} style={{ padding: '8px 16px' }}>Tambah</button>
      </div>

      <div>
        {links.length > 0 ? (
          links.map((link) => (
            <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f4f4f4', padding: '10px', margin: '8px 0', borderRadius: '4px' }}>
              <span><strong>{link.title}</strong>: {link.url}</span>
              <button onClick={() => handleDeleteLink(link.id)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                Hapus
              </button>
            </div>
          ))
        ) : (
          <p>Anda belum memiliki link. Silakan tambahkan.</p>
        )}
      </div>
    </div>
  );
}