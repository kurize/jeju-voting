import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '济州美食行程投票',
  description: '6 人同行 · 14 道题 · 选 A / B / 都要 / 都不要 · 自动生成最终行程',
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
