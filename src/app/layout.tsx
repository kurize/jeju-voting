import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://jeju-voting.vercel.app'),
  title: '济州美食行程投票',
  description: '6 人同行 · 14 道题 · 选 A / B / 都要 / 都不要 · 自动生成最终行程',
  openGraph: {
    title: '济州美食行程投票 🍖🐚🍊',
    description: '6 人同行，14 道美食对决！快来投票选出你最想吃的济州美食吧',
    images: ['/images/sukseongdo-0.jpg'],
    type: 'website',
  },
  other: {
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
