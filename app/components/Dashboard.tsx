"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';

// Definisikan tipe untuk satu objek Link
type Link = {
  id: number;
  title: string;
  url: string;
};

export default function Dashboard({ session }: { session: Session }) {
  // Beri tahu useState bahwa ini adalah array dari Link
  const [links, setLinks] = useState<Link[]>([]); 
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const { user } = session;

  useEffect(() => {
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
    else setLinks(data || []);
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

  async function handleDeleteLink(id: number) { // Tambahkan tipe untuk id
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
          style={{ padding: '8px', flexGrow: 2