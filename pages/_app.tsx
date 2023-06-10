import '@/styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app'
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

