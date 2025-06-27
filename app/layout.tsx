import pretendard from './utils/font';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'XPact',
  description: '작은 경험도 강력한 임팩트로, XPact',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>{children}</body>
    </html>
  );
}
