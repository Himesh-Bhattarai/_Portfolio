import { ThemeProvider } from '@/components/Theme-provider';
import '../src/index.css';

export const metadata = {
  title: 'Himeshchanchal Bhattarai || Himesh Bhattarai-- Personal portfoli webpage',
  verification: {
    google: 'E1nu-m5R85zZGsJ6RGCXnydDhNmLCY95p7LNQkB_YOM',
  },
  icons: {
    icon: [
      {
        url: '/fav-con.png',
        type: 'image/svg+xml',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
