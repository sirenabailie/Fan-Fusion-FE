'use client';

import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@/styles/globals.css'; // Import global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Import Montserrat from Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
