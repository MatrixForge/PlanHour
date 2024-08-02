'use client';
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://nbcyksvprirbaovjlyao.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iY3lrc3ZwcmlyYmFvdmpseWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNjg0NzAsImV4cCI6MjAzNzg0NDQ3MH0.pzF9LiIvb4reKE5ngeFaQ9wSonYsqhbw9hXMOrHKdXE"
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* You can include additional head elements here if needed */}
      </head>
      <body>
        <SessionContextProvider supabaseClient={supabase}>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}
