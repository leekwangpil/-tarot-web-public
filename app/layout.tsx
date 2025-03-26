import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '타로 리딩',
  description: 'AI 타로 리딩 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
