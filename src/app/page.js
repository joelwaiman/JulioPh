'use client'
import React from 'react';

import { ImageRender } from '@/components/ImageRender';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className="bg-green-500">Main</h1>
      <SessionContextProvider supabaseClient={supabase}>
        <ImageRender />
      </SessionContextProvider>
    </main>
  );
}
