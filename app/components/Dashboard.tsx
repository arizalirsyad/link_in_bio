"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js'; // <-- 1. Impor tipe Session

// 2. Gunakan tipe Session untuk mendefinisikan props
export default function Dashboard({ session }: { session: Session }) {
  const [links, setLinks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const { user } = session;

  useEffect(() => {
    // Hanya panggil getLinks jika user sudah ada
    if (user) {
      getLinks();
    }
  }, [user]);

  async function getLinks() {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', user.id);

    if (error) console.error('Error fetching links:', error);
    else setLinks(data || []); // Pastikan memberi fallback array kosong
  }

  async function handleAddLink() {
    if (newTitle.trim() === '' || newUrl.trim() === '') return;

    const { error } = await supabase
      .from('links')
      .insert([{ title: newTitle, url: newUrl, user_id: user.id }]);

    if (error) {
      console.error('Error adding link:', error);
    } else {
      await getLinks();
      setNewTitle('');
      setNewUrl('');
    }
  }

  async function handleDeleteLink(id) {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);

    if (error) console.error('Error deleting link:', error);
    else setLinks(links.filter((link) => link.id !== id));
  }

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