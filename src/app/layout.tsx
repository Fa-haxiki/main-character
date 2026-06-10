import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "《主角》互动分析站",
  description: "以人物关系、故事线和秦腔意象解析电视剧《主角》的互动内容网站。",
  keywords: ["主角", "忆秦娥", "秦腔", "人物关系", "电视剧分析"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
