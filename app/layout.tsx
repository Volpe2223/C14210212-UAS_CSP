import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'C14210212',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
